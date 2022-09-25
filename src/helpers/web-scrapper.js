const fetch = require('node-fetch')
const cheerio = require('cheerio');
class WebScrapper {
  constructor(url) {
    this.url = url;
  };
  async _fetchURL() {
    return await fetch(this.url, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Cache-Control": "max-age=0",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "Sec-Gpc": "1",
        "Upgrade-Insecure-Requests": "1"
      }
    })
  };
  async fetchToText() {
    const response = await this._fetchURL();
    return await response.text()
  }

}

module.exports = WebScrapper;