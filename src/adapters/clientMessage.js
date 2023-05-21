const parseMessage = (message) => {
  try {
    return JSON.parse(message).command;
  } catch (e) {
    throw new Error(`invalid message. expected: json. received: ${message}`);
  }
};

module.exports = parseMessage;
