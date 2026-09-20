const fs = require('fs');
['public/converse-logo.svg', 'public/vans-logo.svg', 'public/on-running-logo.svg'].forEach(file => {
  let data = fs.readFileSync(file, 'utf8');
  if (!data.includes('fill="white"')) {
    data = data.replace('<svg', '<svg fill="white" ');
    fs.writeFileSync(file, data);
  }
});
