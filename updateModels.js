const fs = require('fs');

const data = fs.readFileSync('src/data/faultCodesData.ts', 'utf8');

const lines = data.split('\n');

let currentModel = null;
const newLines = [];

for (let line of lines) {
  const modelMatch = line.match(/\/\/\s*(.+)/);
  if (modelMatch && !line.includes('eslint') && !line.includes('TODO')) {
    currentModel = modelMatch[1].trim();
  }
  
  if (line.includes('brand: \'') && currentModel) {
    // Inject model right after brand
    line = line.replace(/brand:\s*'([^']+)',/, `brand: '$1', model: '${currentModel.replace(/'/g, "\\'")}',`);
  }
  
  newLines.push(line);
}

// Update the interface to include model
const finalContent = newLines.join('\n').replace(
  /brand: 'KONE' \| 'OTIS' \| 'Schindler' \| 'TKE';/,
  "brand: 'KONE' | 'OTIS' | 'Schindler' | 'TKE';\n  model?: string;"
);

fs.writeFileSync('src/data/faultCodesData.ts', finalContent);
console.log('Done updating models');
