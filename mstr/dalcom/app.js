// --- ⚠️ FastAPI 서버 주소 (동일) ---
const MODEL_SERVER_URL = "http://127.0.0.1:3333/measure";
// -------------------------------------------------------------

// HTML 요소들 가져오기
const imageFrontInput = document.getElementById("imageFront");
const depthFrontInput = document.getElementById("depthFront");
const imageSideInput = document.getElementById("imageSide");
const depthSideInput = document.getElementById("depthSide");
const submitButton = document.getElementById("submitButton");

const previewImage = document.getElementById("previewImage");
const measurementsOverlay = document.getElementById("measurementsOverlay");
const loader = document.getElementById("loader");
const resultContainer = document.getElementById("resultContainer");

// 1. "전송" 버튼에 클릭 이벤트 리스너 추가
submitButton.addEventListener("click", handleSubmit);

async function handleSubmit() {
  // 1. 4개의 파일 가져오기
  const imageFrontFile = imageFrontInput.files[0];
  const depthFrontFile = depthFrontInput.files[0];
  const imageSideFile = imageSideInput.files[0];
  const depthSideFile = depthSideInput.files[0];

  // 1. 파일 4개가 모두 있는지 확인
  if (!imageFrontFile || !depthFrontFile || !imageSideFile || !depthSideFile) {
    alert("4개의 파일을 모두 업로드해야 합니다.");
    return;
  }

  // 1. 정면 이미지를 미리보기로 설정
  previewImage.src = URL.createObjectURL(imageFrontFile);
  resultContainer.style.display = "block";
  measurementsOverlay.innerHTML = ""; // 기존 결과 삭제
  loader.style.display = "block"; // 로딩 시작
  submitButton.disabled = true; // 버튼 비활성화

  try {
    // 1. 4개의 파일을 FormData에 담기
    const formData = new FormData();
    formData.append("image_front", imageFrontFile);
    formData.append("depth_front", depthFrontFile);
    formData.append("image_side", imageSideFile);
    formData.append("depth_side", depthSideFile);

    // 3. 모델 서버에 API 요청
    const measurements = await callModelServer(formData);

    // 3. "예쁘게" 그리기 (SVG 곡선 포함)
    drawMeasurements(measurements);
  } catch (error) {
    console.error("모델 서버 오류:", error);
    alert("처리 중 오류가 발생했습니다.");
  } finally {
    loader.style.display = "none"; // 로딩 숨기기
    submitButton.disabled = false; // 버튼 다시 활성화
  }
}

async function callModelServer(formData) {
  // 1. FormData를 POST로 전송
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
 * 3. (핵심!) JSON 데이터로 텍스트와 "SVG 곡선"을 그리는 함수
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

  for (const key in data) {
    const item = data[key];

    // --- 텍스트 박스 그리기 (동일) ---
    const textBox = document.createElement("div");
    textBox.className = "measurement-box";
    textBox.innerText = `${key}: ${item.value} ${item.unit}`;
    textBox.style.top = `${item.text_position.y_pct}%`;
    textBox.style.left = `${item.text_position.x_pct}%`;
    measurementsOverlay.appendChild(textBox);

    // --- 3. (핵심 변경!) SVG 호(Arc) 그리기 ---
    const p1 = item.line_points_pct[0]; // 시작점
    const p2 = item.line_points_pct[1]; // 끝점

    // 호(Arc)를 그리기 위한 계산
    // 1. 반지름: 두 점 사이의 거리의 절반 (수평 거리 가정)
    const radius = Math.abs(p2.x_pct - p1.x_pct) / 2;

    // 2. 호의 중심 x 좌표
    const centerX = (p1.x_pct + p2.x_pct) / 2;

    // 3. 호의 y 좌표 (시작점/끝점의 평균 y 사용)
    const arcY = (p1.y_pct + p2.y_pct) / 2;

    // SVG <path> 요소 생성
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("class", "measurement-curve");

    // SVG Arc 명령: A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)
    // M x1,y1  -> 시작점으로 이동
    // A rx,ry  -> x,y 반지름
    // 0        -> x축 회전 (0)
    // 0,1      -> large-arc-flag (0: 작은 호, 1: 큰 호) / sweep-flag (1: 시계 방향, 0: 반시계)
    // x2,y2    -> 끝점
    //
    // 여기서는 아래로 볼록한 반원을 그릴 것이므로:
    // - rx, ry는 radius 값 (반원)
    // - large-arc-flag: 0 (반원이므로)
    // - sweep-flag: 0 (시계 반대 방향으로 그리면 아래로 볼록)
    const d = `M ${p1.x_pct}% ${p1.y_pct}% A ${radius}% ${radius}% 0 0 0 ${p2.x_pct}% ${p2.y_pct}%`;

    path.setAttribute("d", d);
    svg.appendChild(path);
  }
}
