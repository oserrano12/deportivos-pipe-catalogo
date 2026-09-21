const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });

  await page.goto('http://localhost:3000/producto/adistar-cs-2-zb35', { waitUntil: 'networkidle2' });
  
  await browser.close();
})();
