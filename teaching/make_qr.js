// Generate QR codes (png + svg) for each hosted teaching material.
// Run from the ncomm2026/ folder:  node teaching/make_qr.js
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const BASE = 'https://tuffr5.github.io/michigan-biomedical-compression/teaching';
const OUT = path.join(__dirname);

const materials = [
  { name: 'syllabus',  file: 'VPAT4XXX-6XXX_syllabus.pdf' },
  { name: 'cs4347',    file: 'txstate_cs4347.pdf' },
  { name: 'collaboration_plan', file: 'collaboration_plan.pdf' },
  // demo points at the HTML player page (not the raw mp4) so it plays inline on iOS
  { name: 'onepath_demo', file: 'onepath_demo.html' },
];

(async () => {
  for (const m of materials) {
    const url = `${BASE}/${encodeURIComponent(m.file)}`;
    const opts = { errorCorrectionLevel: 'M', margin: 2, width: 600 };
    await QRCode.toFile(path.join(OUT, `qr_${m.name}.png`), url, opts);
    const svg = await QRCode.toString(url, { ...opts, type: 'svg' });
    fs.writeFileSync(path.join(OUT, `qr_${m.name}.svg`), svg);
    console.log(`qr_${m.name}.png / .svg  ->  ${url}`);
  }
})();
