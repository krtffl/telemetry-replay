const fastify = require('../../src/server');

afterAll(() => {
  fastify.close();
});

test('serve frontend file', async () => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/',
  });

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toBe('text/html; charset=UTF-8');
  expect(response.body).toContain('<html>');
});

test('return 404 for unhandled routes', async () => {
  const response = await fastify.inject({
    method: 'GET',
    url: '/undefined_route',
  });

  expect(response.statusCode).toBe(404);
});
