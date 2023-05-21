const path = require('path');

const setupLogfile = () => {
  return path.join(
    __dirname,
    '..',
    '..',
    '/logs',
    `${new Date().toISOString()}.log`
  );
};

module.exports = setupLogfile;
