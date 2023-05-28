const { readFile } = require('@utils/fileReader');
const config = require('@config/config');
const loadTelemetry = require('@helpers/loadTelemetry');

jest.mock('@utils/fileReader');

test('load telemetry from the file', async () => {
  config.SIMULATION_FILENAME = 'test.txt';
  const mockTelemetry = 'mocked filedata';

  readFile.mockResolvedValue(mockTelemetry);

  const { telemetry, telemetryFilepath } = await loadTelemetry();

  expect(readFile).toHaveBeenCalledWith(telemetryFilepath);
  expect(telemetry).toEqual(mockTelemetry);
});
