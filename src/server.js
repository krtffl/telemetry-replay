const fastify = require('fastify')({ logger: true });
const path = require('path');

require('dotenv').config();

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', '/public'),
});

fastify.get('/', function (_, reply) {
  reply.sendFile(process.env.FRONTEND_FILE || 'frontend.html');
});

fastify.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

module.exports = fastify;
