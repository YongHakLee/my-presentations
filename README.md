# My Presentations

프레젠테이션 바로가기 모음 페이지

## 배포

이 프로젝트는 GitHub Pages에 자동으로 배포됩니다.

- **배포 주소**: https://yonghaklee.github.io/my-presentations/
- **자동 배포**: main/master 브랜치에 push하면 자동으로 배포됩니다.

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
.
├── app/                    # Next.js 앱 디렉토리
│   ├── page.tsx           # 메인 페이지 (프레젠테이션 목록)
│   ├── layout.tsx         # 레이아웃
│   └── globals.css         # 전역 스타일
├── lib/                    # 라이브러리 및 유틸리티
│   └── ui/                 # UI 컴포넌트 라이브러리
├── aiv-2025/               # AI 바우처 프레젠테이션
├── lab-meetings/           # Lab Meeting 프레젠테이션
└── reveal.js/              # Reveal.js 서브모듈
```

## 새 프레젠테이션 추가하기

1. 프레젠테이션 HTML 파일을 적절한 폴더에 추가
2. `app/page.tsx`의 `presentations` 배열에 새 항목 추가:

```typescript
{
  id: 'unique-id',
  title: '프레젠테이션 제목',
  date: 'YYYY-MM-DD',
  category: 'category-name',
  path: '/my-presentations/category/path/index.html',
  description: '설명 (선택사항)',
}
```

## Quick Start

```bash
git clone --recurse-submodules https://github.com/YongHakLee/my-presentations.git
cd my-presentations
npm install
npm run dev
```

## Update Reveal.js

```bash
# 1. 서브모듈 디렉토리로 이동
cd reveal.js/

# 2. 최신 변경사항을 pull 받음
git pull origin master  # 또는 main 브랜치

# 3. 상위 저장소(내 저장소)로 돌아옴
cd ..

# 4. 업데이트된 서브모듈 버전을 커밋
git add reveal.js
git commit -m "Update reveal.js submodule to the latest version"
```
