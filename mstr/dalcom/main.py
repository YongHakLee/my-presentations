import uvicorn
import asyncio  # 모델 처리 시간 시뮬레이션을 위해
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# --- ⚠️ 중요: CORS 설정 ---
# GitHub Pages에서 오는 요청을 허용해야 합니다.
origins = [
    "https://yonghaklee.github.io",  # 👈 실제 GitHub Pages 주소
    "http://127.0.0.1:5500",  # 👈 로컬 테스트용 (VSCode Live Server)
    "http://localhost:5500",
    "null",  # 👈 로컬 file_//... 에서 테스트용
]

# origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 모든 메소드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)
# ------------------------------


@app.get("/")
def read_root():
    return {"status": "Model server is running"}


@app.post("/measure")
async def measure_dimensions(
    # 1. 이제 4개의 파일을 입력으로 받습니다.
    image_front: UploadFile = File(...),
    depth_front: UploadFile = File(...),
    image_side: UploadFile = File(...),
    depth_side: UploadFile = File(...),
):
    """
    정면/측면 이미지와 Depth 파일 총 4개를 받아 치수를 계산합니다.
    """

    # --- 여기에 실제 모델 처리 로직을 넣으세요 ---
    # 1. 4개의 파일을 읽기 (예: await image_front.read())
    # 2. 모델 실행

    # 3. (중요!) 모델이 이미지 크기에 맞춰 *퍼센트 좌표*를 계산
    #    예: 가슴둘레 선의 시작점 (x=216, y=432)
    #        원본 이미지 크기 (width=1080, height=1920)
    #        -> x_pct = (216 / 1080) * 100 = 20%
    #        -> y_pct = (432 / 1920) * 100 = 22.5%
    # ---------------------------------------------

    # (시뮬레이션) 모델이 2초간 작동한다고 가정
    await asyncio.sleep(2)

    # 2. 반환되는 JSON 형식 업데이트 (좌표가 %로 제공됨)
    mock_data = {
        "chest": {
            "value": 118.68,
            "unit": "cm",
            # 텍스트 박스의 위치 (% 좌표)
            "text_position": {"x_pct": 50, "y_pct": 35},
            # (곡)선을 그릴 두 개의 점 (% 좌표)
            "line_points_pct": [
                {"x_pct": 20, "y_pct": 40},
                {"x_pct": 80, "y_pct": 40},
            ],
        },
        "waist": {
            "value": 108.99,
            "unit": "cm",
            "text_position": {"x_pct": 50, "y_pct": 55},
            "line_points_pct": [
                {"x_pct": 25, "y_pct": 60},
                {"x_pct": 75, "y_pct": 60},
            ],
        },
    }
    return mock_data


if __name__ == "__main__":
    # 서버 실행 (터미널에서: uvicorn main:app --reload --host 0.0.0.0 --port 3333)
    uvicorn.run(app, host="0.0.0.0", port=3333)
