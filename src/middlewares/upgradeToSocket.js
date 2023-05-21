const url = require('url');

const WebSocket = require('ws');

const toWebSocket = (fastify) => {
  const wss = new WebSocket.Server({ noServer: true });

  fastify.server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/replay') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  return wss;
};

module.exports = toWebSocket;
