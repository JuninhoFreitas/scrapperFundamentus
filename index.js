// const url = 'https://fundamentus.com.br/fii_resultado.php'
const url = 'http://localhost:3000'
const WebScrapper = require('./src/helpers/web-scrapper')
const webScrapper = new WebScrapper(url);
const HtmlProcessor = require('./src/dataProcessor/htmlProcessor');
;(async()=>{
  const htmlText = await webScrapper.fetchToText();
  const htmlProcessor = new HtmlProcessor(htmlText);
  const listOfStocks = await htmlProcessor.process();
  console.log(listOfStocks)
})()
