// --- ⚠️ FastAPI 서버 주소 (동일) ---
const MODEL_SERVER_URL = "http://127.0.0.1:3333/measure";
// -------------------------------------------------------------

// HTML 요소들 가져오기 (동일)
const imageFrontInput = document.getElementById("imageFront");
const depthFrontInput = document.getElementById("depthFront");
const imageSideInput = document.getElementById("imageSide");
const depthSideInput = document.getElementById("depthSide");
const submitButton = document.getElementById("submitButton");

const previewImage = document.getElementById("previewImage");
const measurementsOverlay = document.getElementById("measurementsOverlay");
const loader = document.getElementById("loader");
const resultContainer = document.getElementById("resultContainer");

// "전송" 버튼 클릭 이벤트 리스너 (동일)
submitButton.addEventListener("click", handleSubmit);

// handleSubmit 함수 (동일)
async function handleSubmit() {
  // 4개의 파일 가져오기
  const imageFrontFile = imageFrontInput.files[0];
  const depthFrontFile = depthFrontInput.files[0];
  const imageSideFile = imageSideInput.files[0];
  const depthSideFile = depthSideInput.files[0];

  if (!imageFrontFile || !depthFrontFile || !imageSideFile || !depthSideFile) {
    alert("4개의 파일을 모두 업로드해야 합니다.");
    return;
  }

  // 미리보기 및 로딩 UI (동일)
  previewImage.src = URL.createObjectURL(imageFrontFile);
  resultContainer.style.display = "block";
  measurementsOverlay.innerHTML = "";
  loader.style.display = "block";
  submitButton.disabled = true;

  try {
    // FormData 생성 (동일)
    const formData = new FormData();
    formData.append("image_front", imageFrontFile);
    formData.append("depth_front", depthFrontFile);
    formData.append("image_side", imageSideFile);
    formData.append("depth_side", depthSideFile);

    // API 호출 (동일)
    const measurements = await callModelServer(formData);

    // Wait for image to load before drawing (so we can get dimensions)
    await new Promise((resolve) => {
      if (previewImage.complete) {
        resolve();
      } else {
        previewImage.onload = resolve;
      }
    });

    // "예쁘게" 그리기 (⭐️ 이 함수가 변경됨)
    drawMeasurements(measurements);
  } catch (error) {
    console.error("모델 서버 오류:", error);
    alert("처리 중 오류가 발생했습니다.");
  } finally {
    loader.style.display = "none";
    submitButton.disabled = false;
  }
}

// callModelServer 함수 (동일)
async function callModelServer(formData) {
  const response = await fetch(MODEL_SERVER_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * 3. (⭐️ 핵심 변경!) JSON 데이터로 텍스트와 "2차 베지어 곡선"을 그리는 함수
 */
function drawMeasurements(data) {
  measurementsOverlay.innerHTML = ""; // 초기화

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.overflow = "visible";

  measurementsOverlay.appendChild(svg);

  // Get the actual pixel dimensions of the overlay/image
  const overlayRect = measurementsOverlay.getBoundingClientRect();
  const overlayWidth = overlayRect.width;
  const overlayHeight = overlayRect.height;

  for (const key in data) {
    const item = data[key];

    // --- 텍스트 박스 그리기 (동일) ---
    const textBox = document.createElement("div");
    textBox.className = "measurement-box";
    textBox.innerText = `${key}: ${item.value} ${item.unit}`;
    textBox.style.top = `${item.text_position.y_pct}%`;
    textBox.style.left = `${item.text_position.x_pct}%`;
    measurementsOverlay.appendChild(textBox);

    // --- 3. (핵심 변경!) 2차 베지어 곡선(Q) 그리기 ---
    const p1 = item.line_points_pct[0]; // 시작점
    const p2 = item.line_points_pct[1]; // 끝점

    // Convert percentage to pixels
    const x1 = (p1.x_pct / 100) * overlayWidth;
    const y1 = (p1.y_pct / 100) * overlayHeight;
    const x2 = (p2.x_pct / 100) * overlayWidth;
    const y2 = (p2.y_pct / 100) * overlayHeight;

    // 곡선을 위한 중간 제어점(Control Point) 계산
    const controlX = (x1 + x2) / 2;
    const controlY = Math.max(y1, y2) + overlayHeight * 0.1; // 10% of height

    // SVG <path> 요소 생성
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("class", "measurement-curve");

    // "M x1,y1 Q cx,cy x2,y2" (이동 -> 2차 베지어 곡선) - now using pixel values
    const d = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;

    path.setAttribute("d", d);
    svg.appendChild(path);
  }
}
