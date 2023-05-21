const { expect } = require('@jest/globals');
const Page = require('../helpers/page');

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

describe('serving frontend', () => {
  test('frontend loads with first data item and in paused state', async () => {
    const disabledButton = await page.getContentsOf('button[disabled]');
    expect(disabledButton).toEqual('STOP');

    const time = await page.getContentsOf('.data_item__value');
    expect(time).toEqual('09:01:00.011');

    const log = await page.getContentsOf('pre');
    expect(log).toContain('stop');
  });
});

describe('user actions', () => {
  test('pressing play and then pausing shows data has changed', async () => {
    const buttons = await page.$$('button');

    const playButton = await buttons[0].evaluate((el) => el.innerHTML);
    expect(playButton).toEqual('PLAY');

    const stopButton = await buttons[1].evaluate((el) => el.innerHTML);
    expect(stopButton).toEqual('STOP');

    await buttons[0].click();
    await Page.timer(250);
    await buttons[1].click();

    const time = await page.getContentsOf('.data_item__value');
    expect(time).not.toEqual('09:01:00.011');

    const log = await page.getContentsOf('pre');
    expect(log).toContain('play');
  });

  test('stream is reset after playing reset', async () => {
    const buttons = await page.$$('button');

    const playButton = await buttons[0].evaluate((el) => el.innerHTML);
    expect(playButton).toEqual('PLAY');

    const stopButton = await buttons[2].evaluate((el) => el.innerHTML);
    expect(stopButton).toEqual('RESET');

    await buttons[0].click();
    await Page.timer(250);
    await buttons[2].click();

    const time = await page.getContentsOf('.data_item__value');
    expect(time).toEqual('09:01:00.011');

    const log = await page.getContentsOf('pre');
    expect(log).toContain('reset');
  });
});
