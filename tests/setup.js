const Page = require('./helpers/page');

let page;

jest.setTimeout(30000);

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
  await page.waitForSelector('button');
});

afterEach(async () => {
  await page.close();
});

describe('fastify server routes', () => {
  test('frontend page loads properly', async () => {
    const title = await page.getContentsOf('.data_item__title');
    expect(title).toEqual('TIME');
  });

  test('buttons are disabled if socket not connected', async () => {
    const button = await page.getContentsOf('button[disabled]');
    expect(button).toBeTruthy();
  });
});
