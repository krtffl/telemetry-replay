const { status, data } = require('@adapters/telemetry');

const handleSocketConnection = (ws, telemetry) => {
  const session = {
    isPlaying: false,
    lastItemStreamed: null,
    lastItem: telemetry.length - 1,
    interval: null,
  };

  ws.on('message', (message) => {
    const { command } = JSON.parse(message);

    if (command === 'play') {
      session.isPlaying = true;
    }

    if (command === 'stop') {
      session.isPlaying = false;
    }

    if (command === 'reset') {
      session.isPlaying = false;
      session.lastItemStreamed = null;
    }

    ws.send(status(command));
    sendTelemetry(ws, session, telemetry);
  });

  ws.on('close', () => {
    clearInterval(session.interval);
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

  if (session.lastItemStreamed === session.lastItem) {
    ws.send(status('stop'));
    clearInterval(session.interval);
    return;
  }

  session.interval = setInterval(() => {
    ws.send(data(telemetry[session.lastItemStreamed + 1]));
    session.lastItemStreamed++;
  }, 55);
};

module.exports = handleSocketConnection;
