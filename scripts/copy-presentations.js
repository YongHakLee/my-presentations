const fs = require('fs');
const path = require('path');

// out 디렉토리에 프레젠테이션 폴더들을 복사
const outDir = path.join(__dirname, '..', 'out');
const presentationDirs = ['aiv-2025', 'lab-meetings', 'reveal.js'];

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
if (fs.existsSync(outDir)) {
  presentationDirs.forEach((dir) => {
    const srcDir = path.join(__dirname, '..', dir);
    if (fs.existsSync(srcDir)) {
      const destDir = path.join(outDir, dir);
      console.log(`Copying ${dir} to ${destDir}`);
      copyDir(srcDir, destDir);
    }
  });
  console.log('Presentations copied successfully!');
} else {
  console.log('Out directory does not exist. Run "npm run build" first.');
}

