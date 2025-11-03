# GitHub Pages 배포 가이드

## 1. GitHub 저장소 설정

### Pages 활성화

1. GitHub 저장소로 이동: https://github.com/YongHakLee/my-presentations
2. **Settings** > **Pages** 메뉴로 이동
3. **Source** 섹션에서:
   - **Source**: "GitHub Actions" 선택
   - 또는 "Deploy from a branch" 선택 후 **main/master** 브랜치와 **/ (root)** 선택
4. **Save** 클릭

### GitHub Actions 권한 설정

1. **Settings** > **Actions** > **General** 메뉴로 이동
2. **Workflow permissions** 섹션에서:
   - **Read and write permissions** 선택
   - **Allow GitHub Actions to create and approve pull requests** 체크 (선택사항)

## 2. 배포

### 자동 배포 (권장)

1. 변경사항을 커밋하고 push:

```bash
git add .
git commit -m "Add Next.js presentation index page"
git push origin main  # 또는 master
```

2. GitHub Actions가 자동으로 빌드하고 배포합니다.
3. **Actions** 탭에서 배포 진행 상황을 확인할 수 있습니다.
4. 배포 완료 후 몇 분 후에 다음 주소에서 확인 가능:
   - https://yonghaklee.github.io/my-presentations/

### 수동 배포

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# out 디렉토리가 생성됩니다
# out 디렉토리의 내용을 gh-pages 브랜치에 push
```

## 3. 문제 해결

### 배포가 안 될 때

1. **Actions** 탭에서 오류 메시지 확인
2. 브랜치 이름 확인 (main 또는 master)
3. GitHub Pages 설정 확인

### 페이지가 보이지 않을 때

1. 빌드가 완료되었는지 확인 (**Actions** 탭)
2. 몇 분 기다린 후 다시 시도
3. 브라우저 캐시 삭제 후 다시 시도
4. URL이 정확한지 확인: `https://yonghaklee.github.io/my-presentations/`

### 프레젠테이션 링크가 작동하지 않을 때

1. 프레젠테이션 파일들이 `out` 디렉토리에 복사되었는지 확인
2. `app/page.tsx`의 경로가 `/my-presentations/`로 시작하는지 확인

## 4. 로컬에서 테스트

```bash
# 빌드
npm run build

# 정적 파일 서버로 테스트 (선택사항)
npx serve out
```

브라우저에서 `http://localhost:3000/my-presentations/`로 접속하여 확인할 수 있습니다.

