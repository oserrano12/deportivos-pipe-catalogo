const fs = require('fs');

const files = [
  'public/converse-logo.svg',
  'public/vans-logo.svg',
  'public/on-running-logo.svg'
];

files.forEach(file => {
  let data = fs.readFileSync(file, 'utf8');
  // Match path with M0 0h...v...H0V0z
  data = data.replace(/<path[^>]+M0 0h[0-9.]+v[0-9.]+H0V0z[^>]*\/>/gi, '');
  // Match path with M0 0h...v...H0z
  data = data.replace(/<path[^>]+M0 0h[0-9.]+v[0-9.]+H0z[^>]*\/>/gi, '');
  fs.writeFileSync(file, data);
});
console.log('Backgrounds removed strictly!');
