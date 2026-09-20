const fs = require('fs');
const https = require('https');

https.get('https://cdn.worldvectorlogo.com/logos/vans-2.svg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // 1. Remove the white background square
    data = data.replace(/<path[^>]+M0 0h[0-9.]+v[0-9.]+H0V0z[^>]*\/>/gi, '');
    
    // 2. The letters in original SVG are fill="#FFFFFF". We want them BLACK so they act as cutouts
    data = data.replace(/fill="#?[fF]{3,6}"/g, 'fill="black"');
    data = data.replace(/fill="white"/gi, 'fill="black"');
    
    // 3. Force the parent SVG to fill="white", which makes all paths without a fill (the main block) WHITE.
    if (!data.includes('<svg fill=')) {
       data = data.replace('<svg ', '<svg fill="white" ');
    }
    
    // 4. Crop the viewBox
    data = data.replace(/viewBox="[^"]+"/, 'viewBox="10 75 170 35"');
    
    fs.writeFileSync('public/vans-logo.svg', data);
    console.log('Fixed Vans logo!');
  });
});
