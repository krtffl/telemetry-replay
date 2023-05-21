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
      fastify.log.info(
        `socket closed due to mismatched path. expected: /replay. received: ${pathname}`
      );

      socket.destroy();
    }
  });

  fastify.log.info('fastify server upgraded to handle web sockets at /replay');

  return wss;
};

module.exports = toWebSocket;
