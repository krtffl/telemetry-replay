const fastify = require('fastify')({ logger: true });
const path = require('path');

const toWebSocket = require('./middlewares/socket');
const handleError = require('./helpers/errors');
const readJson = require('./utils/reader');
const handleSocketConnection = require('./utils/player');

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
  if (err) handleError(err);

  const wss = toWebSocket(fastify);
  fastify.log.info('fastify server upgraded to handle web sockets at /replay');

  wss.on('connection', (socket) => {
    fastify.log.info('new socket connected!');
    handleSocketConnection(socket, telemetry);
  });
});

fastify.listen(process.env.PORT || 3000, (err) => {
  if (err) handleError(err);
});

module.exports = fastify;
