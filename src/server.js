const path = require('path');
const logfile = path.join(
  __dirname,
  '..',
  '/logs',
  `/${new Date().toISOString()}.log`
);

require('module-alias/register');

const fastify = require('fastify')({
  logger: {
    level: 'info',
    file: logfile,
  },
});

const toWebSocket = require('@middlewares/upgradeToSocket');
const readJson = require('@utils/fileReader');
const handleSocketConnection = require('@utils/handleSocket');

require('dotenv').config();

const telemetryFilepath = path.join(
  __dirname,
  '..',
  '/data',
  process.env.SIMULATION_FILENAME || 'simfile.json'
);

const telemetry = readJson(telemetryFilepath);
fastify.log.info(`telemetry file loaded: ${telemetryFilepath}`);

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', '/public'),
});

fastify.get('/', function (_, reply) {
  reply.sendFile(process.env.FRONTEND_FILENAME || 'frontend.html');
});

fastify.ready((err) => {
  if (err) {
    fastify.log.error(e);
    process.exit(1);
  }

  const wss = toWebSocket(fastify);
  fastify.log.info('fastify server upgraded to handle web sockets at /replay');

  wss.on('connection', (socket) => {
    fastify.log.info('new socket connected!');
    handleSocketConnection(socket, telemetry);
  });
});

fastify.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    fastify.log.error(e);
    process.exit(1);
  }
});

module.exports = fastify;
