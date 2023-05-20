const fs = require('fs');

const readJson = require('./reader');

beforeEach(() => {
  const valid = {
    startTime: '2019-01-01T09:01:00+03:00',
    data: [
      {
        time: '2019-01-01T09:01:00.011+03:00',
        gear: '1',
        rpm: 10895,
        speed: 0,
      },
    ],
  };

  fs.writeFileSync('tests/mocks/valid-json-file.json', JSON.stringify(valid));
  fs.writeFileSync('tests/mocks/non-valid-json-file.json', '');
  fs.writeFileSync('tests/mocks/non-json-file.txt', '');
});

afterEach(() => {
  fs.unlinkSync('tests/mocks/valid-json-file.json');
  fs.unlinkSync('tests/mocks/non-valid-json-file.json');
  fs.unlinkSync('tests/mocks/non-json-file.txt');
});

test('throws when file is not a json file', () => {
  expect(() => readJson('tests/mocks/non-json-file.txt')).toThrowError(
    `invalid file type. expected: json. received: .txt`
  );
});

test('throws when file content is not valid', () => {
  expect(() => readJson('tests/mocks/non-valid-json-file.json')).toThrowError();
});

test('throws when file is not found', () => {
  expect(() => readJson('non-existent.file.json')).toThrowError();
});

test('reads valid json and returns data', () => {
  const data = readJson('tests/mocks/valid-json-file.json');
  expect(data).toHaveProperty('data');
  expect(data).toHaveProperty('startTime');
});
