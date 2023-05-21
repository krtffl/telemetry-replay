const { status, data } = require('@adapters/telemetryResponse');
const handleCommand = require('./handleCommand');
const parseMessage = require('../adapters/clientMessage');

const handleSocketConnection = (ws, telemetry, logger) => {
  const session = {
    isPlaying: false,
    lastItemStreamed: null,
    lastItem: telemetry.length - 1,
    interval: null,
  };
  logger.info(`new session initialized: ${JSON.stringify(session)}`);

  ws.on('error', (err) => {
    logger.err(`unexpected error on socket. ${err}`);
  });

  ws.on('message', (message) => {
    logger.info(`incoming message: ${message}`);
    ws.send(JSON.stringify({ data: JSON.parse(message) }));

    handleCommand(session, parseMessage(message));
    sendTelemetry(ws, session, telemetry);
  });

  ws.on('close', () => {
    logger.info('socket closed.');

    const { interval, ...rest } = session;
    clearInterval(session.interval);

    logger.info(`session: ${JSON.stringify(rest)}`);
  });

  sendTelemetry(ws, session, telemetry);
};

const sendTelemetry = (ws, session, telemetry) => {
  if (session.lastItemStreamed === null) {
    ws.send(data(telemetry[0]));
    ws.send(status('stop'));

    session.lastItemStreamed = 0;
    clearInterval(session.interval);

    return;
  }

  if (!session.isPlaying) {
    clearInterval(session.interval);

    return;
  }

  session.interval = setInterval(() => {
    if (session.lastItemStreamed === session.lastItem) {
      ws.send(status('stop'));
      clearInterval(session.interval);

      return;
    }

    ws.send(data(telemetry[session.lastItemStreamed + 1]));
    session.lastItemStreamed++;
  }, parseInt(process.env.STREAMING_INTERVAL) || 55);
};

module.exports = handleSocketConnection;
