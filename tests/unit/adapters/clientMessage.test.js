const parseMessage = require('../../../src/adapters/clientMessage');

test('throws with an invalid json', () => {
  const invalidMessage = 'invalid JSON';
  expect(() => parseMessage(invalidMessage)).toThrowError(
    `invalid message. expected: json. received: ${invalidMessage}`
  );
});

test('returns command with valid json', () => {
  const mesage = JSON.stringify({ command: 'start' });
  expect(parseMessage(mesage)).toEqual('start');
});
