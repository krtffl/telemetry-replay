const handleCommand = require('@utils/handleCommand');

let session;

beforeEach(() => {
  session = {
    isPlaying: false,
    lastItemStreamed: null,
  };
});

test('throws with an unexpected command', () => {
  const unexpectedCommand = 'unexpected';
  expect(() => handleCommand(session, unexpectedCommand)).toThrowError(
    `invalid command. expected: start|stop|reset. received: unexpected`
  );
});

test('play sets isPlaying to true', () => {
  handleCommand(session, 'play');
  expect(session.isPlaying).toBe(true);
});

test('stop sets isPlaying to false', () => {
  session.isPlaying = true;
  handleCommand(session, 'stop');
  expect(session.isPlaying).toBe(false);
});

test('reset sets isPlaying to false and lastItemStreamed to null', () => {
  session.isPlaying = true;
  session.lastItemStreamed = 5;
  handleCommand(session, 'reset');
  expect(session.isPlaying).toBe(false);
  expect(session.lastItemStreamed).toBeNull();
});
