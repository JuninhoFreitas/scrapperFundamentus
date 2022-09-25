const cheerio = require('cheerio')
const fs = require('fs')
class HTMLProcessor {
    constructor(text) {
        this.text = text;
        this.$ = this._textToHtml(this.text);
        fs.writeFileSync('./test.txt', text);
    };
    _textToHtml(text) {
        return cheerio.load(text);
    }
    _cleanText(text) {
        return text.filter((a) => a !== '')
    }
    _serializeText(text) {
        let template = {
            'papel': '',
            'segmento': '',
            'cotacao': '',
            'ffo_yield': '',
            'dividend_yield': '',
            'pvp': '',
            'valor_de_mercado': '',
            'liquidez': '',
            'qtd_de_imoveis': '',
            'preco_do_m2': '',
            'aluguel_por_m2': '',
            'cap_rate': '',
            'vacancia_media': '',
            'endereco': '',
        }

        const tempObject = {
            ...template
        };
        
        for (const pos in text) {
            tempObject[Object.keys(tempObject)[pos]] = Object.values(text)[pos];
        }

        return tempObject;
    }
    async process() {
        const table = this.$('tbody')
        let actualRow = table.find('tr');
        const listOfStocks = []

        for (let i = 0; i < table.children().length; i++) {
            actualRow = actualRow.next();
            const rawText = actualRow.first().text()
            const splitedText = rawText.split('\n')
            const filteredText = this._cleanText(splitedText)
            const result = this._serializeText(filteredText);
            listOfStocks.push(result);
        }

        return listOfStocks;

    }


}

module.exports = HTMLProcessor;