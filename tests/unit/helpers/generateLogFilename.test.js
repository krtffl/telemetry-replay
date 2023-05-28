const path = require('path');

const generateFilename = require('@helpers/generateLogFilename');

test('generate log filename', async () => {
  const filename = generateFilename();

  console.log(filename);

  expect(filename.endsWith('.log')).toBe(true);
  expect(() => path.parse(filename)).not.toThrow();
});
