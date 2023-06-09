require('module-alias/register');

const path = require('path');

const fastify = require('fastify')({
  logger: {
    level: 'info',
    file: require('@helpers/generateLogFilename')(),
  },
});

const loadTelemetry = require('@helpers/loadTelemetry');
const toWebSocket = require('@middlewares/upgradeToSocket');
const handleSocketConnection = require('@utils/handleSocket');
const config = require('@config/config');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', '/public'),
});

fastify.get('/', function (_, reply) {
  reply.sendFile(config.FRONTEND_FILENAME);
});

(async () => {
  const { telemetry, telemetryFilepath } = await loadTelemetry();

  fastify.log.info(`telemetry file loaded: ${telemetryFilepath}`);
  fastify.log.info(`used streams?: ${config.USE_STREAMS}`);

  fastify.ready((err) => {
    if (err) {
      fastify.log.error(err);
    }

    const wss = toWebSocket(fastify);

    wss.on('connection', (socket) => {
      fastify.log.info('new socket connected!');
      handleSocketConnection(socket, telemetry, fastify.log);
    });
  });

  fastify.listen(process.env.PORT || 3000, (err) => {
    if (err) {
      fastify.log.error(err);
    }

    console.log(`fastify server running...`);
    console.log(`please find the logs at /logs`);
  });
})();

module.exports = fastify;
