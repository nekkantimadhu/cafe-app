const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://nekkantimadhu.github.io/cafe-app/?table=';
const numberOfTables = 5;
const outputDir = './qr-codes';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function generateQRCode(tableNum) {
  const tableUrl = `${baseUrl}${tableNum}`;
  const filePath = path.join(outputDir, `table-${tableNum}.png`);

  try {
    await QRCode.toFile(filePath, tableUrl, {
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 300
    });
    console.log(`✅ QR Code generated for Table ${tableNum}: ${filePath}`);
  } catch (err) {
    console.error(`❌ Failed to generate QR for Table ${tableNum}`, err);
  }
}

(async () => {
  for (let i = 1; i <= numberOfTables; i++) {
    await generateQRCode(i);
  }
})();
