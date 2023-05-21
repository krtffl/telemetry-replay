const fs = require('fs');
const path = require('path');

const readJson = require('@utils/fileReader');

const mocks = path.join(__dirname, '..', '..', '/mocks');

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

  fs.writeFileSync(
    path.join(mocks, 'valid-json-file.json'),
    JSON.stringify(valid)
  );
  fs.writeFileSync(path.join(mocks, 'non-valid-json-file.json'), '');
  fs.writeFileSync(path.join(mocks, 'non-json-file.txt'), '');
});

afterEach(() => {
  fs.unlinkSync(path.join(mocks, 'valid-json-file.json'));
  fs.unlinkSync(path.join(mocks, 'non-valid-json-file.json'));
  fs.unlinkSync(path.join(mocks, 'non-json-file.txt'));
});

test('throws when file is not a json file', () => {
  expect(() => readJson(path.join(mocks, 'non-json-file.txt'))).toThrowError(
    `invalid file type. expected: json. received: .txt`
  );
});

test('throws when file content is not valid', () => {
  expect(() =>
    readJson(path.join(mocks, 'non-valid-json-file.json'))
  ).toThrowError();
});

test('throws when file is not found', () => {
  expect(() =>
    readJson(path.join(mocks, 'non-existent.file.json'))
  ).toThrowError();
});

test('reads valid json and returns data', () => {
  const data = readJson(path.join(mocks, 'valid-json-file.json'));
  expect(data).toBeInstanceOf(Array);
  expect(data).toBeTruthy();
});
