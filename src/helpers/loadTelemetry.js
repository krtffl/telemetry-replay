const path = require('path');
const { readFile } = require('@utils/fileReader');

const loadTelemetry = async () => {
  const telemetryFilepath = path.join(
    __dirname,
    '..',
    '..',
    '/data',
    process.env.SIMULATION_FILENAME || 'simfile.json'
  );

  const telemetry = await readFile(telemetryFilepath);
  return { telemetry, telemetryFilepath };
};

module.exports = loadTelemetry;
