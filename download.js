const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Force fill="white"
        data = data.replace(/fill="[^"]+"/g, 'fill="white"');
        if (!data.includes('fill="white"')) {
           data = data.replace('<svg ', '<svg fill="white" ');
        }
        fs.writeFileSync(dest, data);
        resolve();
      });
    }).on('error', reject);
  });
}

Promise.all([
  download('https://cdn.worldvectorlogo.com/logos/converse-1.svg', 'public/converse-logo.svg'),
  download('https://cdn.worldvectorlogo.com/logos/vans-2.svg', 'public/vans-logo.svg'),
  download('https://cdn.worldvectorlogo.com/logos/on-cloud-shoes.svg', 'public/on-running-logo.svg')
]).then(() => console.log('Downloaded and colored SVGs!')).catch(console.error);
