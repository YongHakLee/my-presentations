// --- ⚠️ 중요: 이 주소를 실제 배포된 FastAPI 서버 주소로 변경하세요! ---
// 예: "https://my-model-server.fly.dev/measure"
const MODEL_SERVER_URL = "http://127.0.0.1:3333/measure";
// -------------------------------------------------------------

// HTML 요소들 가져오기
const imageUploader = document.getElementById("imageUploader");
const previewImage = document.getElementById("previewImage");
const measurementsOverlay = document.getElementById("measurementsOverlay");
const loader = document.getElementById("loader");
const resultContainer = document.getElementById("resultContainer");

// 파일 업로더에 이벤트 리스너 추가
imageUploader.addEventListener("change", handleImageUpload);

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // 1. 이미지 미리보기
  previewImage.src = URL.createObjectURL(file);

  // 2. 기존 결과물 지우고 로더 보여주기
  measurementsOverlay.innerHTML = "";
  loader.style.display = "block";
  resultContainer.style.display = "block";

  try {
    // 3. 모델 서버에 API 요청 보내기
    const measurements = await callModelServer(file);

    // 4. "예쁘게" 그리기
    drawMeasurements(measurements);
  } catch (error) {
    console.error("모델 서버 오류:", error);
    alert("처리 중 오류가 발생했습니다. (서버 CORS 설정 확인!)");
  } finally {
    // 5. 로딩 숨기기
    loader.style.display = "none";
  }
}

async function callModelServer(imageFile) {
  const formData = new FormData();
  // 'file'이라는 키로 이미지 파일을 보냅니다.
  // (FastAPI의 `file: UploadFile = File(...)`과 이름이 같아야 함)
  formData.append("file", imageFile);

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
 * 받은 JSON 데이터로 "예쁜" HTML 요소를 생성하는 함수
 */
function drawMeasurements(data) {
  measurementsOverlay.innerHTML = ""; // 초기화

  // 객체의 각 키(chest, waist)에 대해 반복
  for (const key in data) {
    const item = data[key];

    // 1. 텍스트 박스
    const textBox = document.createElement("div");
    textBox.className = "measurement-box";
    textBox.innerText = `${key}: ${item.value} ${item.unit}`;
    textBox.style.top = `${item.position.y_percent}%`;
    textBox.style.left = `${item.position.x_percent}%`;

    // 2. 가로선
    const lineBox = document.createElement("div");
    lineBox.className = "measurement-line";
    lineBox.style.top = `${item.line.y_percent}%`;
    lineBox.style.left = `${item.line.start_x_percent}%`;
    lineBox.style.width = `${
      item.line.end_x_percent - item.line.start_x_percent
    }%`;

    measurementsOverlay.appendChild(textBox);
    measurementsOverlay.appendChild(lineBox);
  }
}
