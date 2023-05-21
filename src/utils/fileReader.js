const fs = require('fs');
const path = require('path');

const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { pick } = require('stream-json/filters/Pick');
const { streamArray } = require('stream-json/streamers/StreamArray');

const readJson = (filepath) => {
  const filetype = path.extname(filepath);

  if (filetype !== '.json') {
    throw new Error(`invalid file type. expected: json. received: ${filetype}`);
  }

  const file = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(file).data;
};

const readJsonStream = (filepath) => {
  return new Promise((resolve, reject) => {
    const filetype = path.extname(filepath);
    if (filetype !== '.json') {
      reject(
        new Error(`invalid file type. expected: json. received: ${filetype}`)
      );
    }

    const file = [];

    const stream = chain([
      fs.createReadStream(filepath),
      parser(),
      pick({ filter: 'data' }),
      streamArray(),
    ]);

    stream.on('data', (data) => {
      file.push(data.value);
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('end', () => {
      console.log('resolving fle');
      resolve(file);
    });
  });
};

const readFile = async (filepath) => {
  if (process.env.USE_STREAMS) {
    return await readJsonStream(filepath);
  }

  return readJson(filepath);
};

module.exports = { readFile, readJson, readJsonStream };
