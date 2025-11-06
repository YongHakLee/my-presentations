const fs = require('fs');
const path = require('path');

// out 디렉토리에 프레젠테이션 폴더들을 복사
const outDir = path.join(__dirname, '..', 'out');

// 소스와 목적지 경로를 명확하게 정의
const presentationDirs = [
  { src: 'presentations/aiv-2025', dest: 'aiv-2025' },
  { src: 'presentations/lab-meetings', dest: 'lab-meetings' },
  { src: 'reveal.js', dest: 'reveal.js' }
];

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// out 디렉토리가 존재하는지 확인
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: Out directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

console.log('📦 Copying presentation directories...\n');

let successCount = 0;
let errorCount = 0;

presentationDirs.forEach(({ src, dest }) => {
  const srcDir = path.join(__dirname, '..', src);
  const destDir = path.join(outDir, dest);

  if (!fs.existsSync(srcDir)) {
    console.error(`❌ Error: Source directory not found: ${srcDir}`);
    errorCount++;
    return;
  }

  try {
    console.log(`📁 Copying ${src} → out/${dest}`);
    copyDir(srcDir, destDir);

    // 복사된 파일 수 계산
    const fileCount = countFiles(destDir);
    console.log(`   ✅ Copied ${fileCount} files\n`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error copying ${src}: ${error.message}\n`);
    errorCount++;
  }
});

// 결과 요약
console.log('═══════════════════════════════════════');
console.log(`✅ Successfully copied: ${successCount} directories`);
if (errorCount > 0) {
  console.log(`❌ Failed: ${errorCount} directories`);
  process.exit(1);
} else {
  console.log('🎉 All presentations copied successfully!');
}
console.log('═══════════════════════════════════════\n');

// 파일 수 계산 헬퍼 함수
function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }

  return count;
}
