# My Presentations

A collection of presentation materials using reveal.js.

## Quick Start

```bash
git clone --recurse-submodules https://github.com/YongHakLee/my-presentations.git
```

## Update

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

## Repository Structure

- `lab-meetings/` - Lab meeting presentations
- `reveal.js/` - Reveal.js submodule for presentation functionality
- `docs/` - Documentation and guides