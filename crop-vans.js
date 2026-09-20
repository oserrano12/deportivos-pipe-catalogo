const fs = require('fs');
let data = fs.readFileSync('public/vans-logo.svg', 'utf8');
data = data.replace('viewBox="0 0 192.756 192.756"', 'viewBox="10 75 170 35"');
fs.writeFileSync('public/vans-logo.svg', data);
