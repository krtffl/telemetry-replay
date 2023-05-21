const fs = require('fs');
const path = require('path');

const readJson = (filepath) => {
  const filetype = path.extname(filepath);

  if (filetype !== '.json') {
    throw new Error(`invalid file type. expected: json. received: ${filetype}`);
  }

  const file = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(file).data;
};

module.exports = readJson;
