const path = require('path');
const { readFile } = require('@utils/fileReader');
const config = require('@src/config');

const loadTelemetry = async () => {
  const telemetryFilepath = path.join(
    __dirname,
    '..',
    '..',
    '/data',
    config.SIMULATION_FILENAME
  );

  const telemetry = await readFile(telemetryFilepath);
  return { telemetry, telemetryFilepath };
};

module.exports = loadTelemetry;
