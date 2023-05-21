const handleFastifyError = (e) => {
  fastify.log.error(e);
  process.exit(1);
};

module.exports = handleFastifyError;
