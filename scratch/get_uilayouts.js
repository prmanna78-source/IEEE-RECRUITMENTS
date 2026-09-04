const zlib = require('zlib');
const fs = require('fs');

async function run() {
  const fileUrl = 'https://raw.githubusercontent.com/ui-layouts/uilayouts/main/apps/ui-layout/components/ui/liquid-glass.tsx';
  const fileRes = await fetch(fileUrl);
  console.log('Status:', fileRes.status);
  const text = await fileRes.text();
  console.log('Length:', text.length);
  fs.writeFileSync('scratch/liquid-glass.tsx', text);
  console.log('Saved to scratch/liquid-glass.tsx');
}
run();
