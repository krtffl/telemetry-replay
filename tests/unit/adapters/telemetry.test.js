const { data, status } = require('../../../src/adapters/telemetry');

describe('telemetry data response', () => {
  test('returns data properly mapped', () => {
    const input = {
      time: '2019-01-01T09:01:00.011+03:00',
    };

    const expected = {
      kind: 'data',
      data: { ...input, time: '09:01:00.011' },
    };

    expect(data(input)).toEqual(JSON.stringify(expected));
  });

  test('throws when time not in ISO 8601', () => {
    const input = {
      time: 'invalid-time',
    };

    expect(() => data(input)).toThrowError(
      new Error(
        `invalid time type. expected: ISO 8601. received: ${input.time}`
      )
    );
  });
});

describe('streaming status response', () => {
  test('returns status', () => {
    const input = 'string';

    const expected = {
      kind: 'status',
      data: input,
    };

    expect(status(input)).toEqual(JSON.stringify(expected));
  });

  test('throws when status is not a string', () => {
    const input = 123;
    expect(() => status(input)).toThrowError(
      new Error(
        `invalid status type. expected: string. received: ${typeof input}`
      )
    );
  });
});
