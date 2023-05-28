const path = require('path');

const generateFilename = () => {
  return path.join(
    __dirname,
    '..',
    '..',
    '/logs',
    `${new Date().toISOString()}.log`
  );
};

module.exports = generateFilename;
