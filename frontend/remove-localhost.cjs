const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('http://localhost:5000')) {
    content = content.replace(/http:\/\/localhost:5000/g, '');
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      replaceInFile(fullPath);
    }
  });
};

traverseDirectory(directoryPath);
console.log('Replacement complete.');
