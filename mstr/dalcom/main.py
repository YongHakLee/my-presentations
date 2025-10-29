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
    "null",  # 👈 로컬 file_//... 에서 테스트용
]

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
    # 서버가 살아있는지 확인하는 용도
    return {"status": "Model server is running"}


@app.post("/measure")
async def measure_dimensions(file: UploadFile = File(...)):
    """
    이미지 파일을 받아 치수를 계산하고 JSON을 반환하는 API
    'file'이라는 이름으로 이미지를 받아야 합니다.
    """

    # --- 여기에 실제 모델 처리 로직을 넣으세요 ---
    # 1. 업로드된 파일(file)을 Pillow나 OpenCV로 읽기
    #    contents = await file.read()
    #    image = Image.open(io.BytesIO(contents))

    # 2. 이미지와 Depth 데이터로 모델 실행
    #    ...

    # 3. 결과 JSON 생성
    #    ...

    # --- (시뮬레이션) 모델이 2초간 작동한다고 가정 ---
    await asyncio.sleep(2)

    # (시뮬레이션) 모델이 반환한 가짜(Mock) 데이터
    mock_data = {
        "chest": {
            "value": 118.68,
            "unit": "cm",
            "position": {"x_percent": 50, "y_percent": 35},
            "line": {
                "y_percent": 40,
                "start_x_percent": 20,
                "end_x_percent": 80,
            },
        },
        "waist": {
            "value": 108.99,
            "unit": "cm",
            "position": {"x_percent": 50, "y_percent": 55},
            "line": {
                "y_percent": 60,
                "start_x_percent": 25,
                "end_x_percent": 75,
            },
        },
    }
    # ---------------------------------------------

    return mock_data


if __name__ == "__main__":
    # 서버 실행 (터미널에서: uvicorn main:app --reload --host 0.0.0.0 --port 3333)
    uvicorn.run(app, host="0.0.0.0", port=3333)
