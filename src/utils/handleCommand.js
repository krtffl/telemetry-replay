const handleCommand = (session, command) => {
  if (command === 'play') {
    session.isPlaying = true;
    return;
  }

  if (command === 'stop') {
    if (!session.isPlaying) return;
    session.isPlaying = false;
    return;
  }

  if (command === 'reset') {
    session.isPlaying = false;
    session.lastItemStreamed = null;
    return;
  }

  throw new Error(
    `invalid command. expected: start|stop|reset. received: ${command}`
  );
};

module.exports = handleCommand;
