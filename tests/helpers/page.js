const puppeteer = require('puppeteer');

class Page {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    const customPage = new Page(page);

    return new Proxy(customPage, {
      get: function (_, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  static async timer(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = Page;
