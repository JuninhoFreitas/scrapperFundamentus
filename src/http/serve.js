// const url = 'https://fundamentus.com.br/fii_resultado.php'
const url = 'http://localhost:3000'
const WebScrapper = require('../helpers/web-scrapper')
const webScrapper = new WebScrapper(url);
const HtmlProcessor = require('../dataProcessor/htmlProcessor');
const express = require('express');
const app = express();

const getData = async(req,res,next)=>{
    const htmlText = await webScrapper.fetchToText();
    const htmlProcessor = new HtmlProcessor(htmlText);
    const listOfStocks = await htmlProcessor.process();
    res.json(listOfStocks);
    return next();
}
app.get('/',getData);

module.exports = app;


