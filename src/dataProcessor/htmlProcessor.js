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
    async process() {
        const table = this.$('tbody')
        const row = table.find('tr');
        let actualRow = table.find('tr');
        let total = []
        let template = {
            'Papel': '',
            'Segmento': '',
            'Cotacao': '',
            'FFO_Yield': '',
            'Dividend_Yield': '',
            'PVP': '',
            'Valor_de_Mercado': '',
            'Liquidez': '',
            'Qtd_de_imoveis': '',
            'Preco_do_m2': '',
            'Aluguel_por_m2': '',
            'Cap_Rate': '',
            'Vacancia_Media': '',
            'Endereco': '',
        }

        for (let i = 0; i < table.children().length; i++) {
            actualRow = actualRow.next();
            let splited = actualRow.first().text().split('\n').filter((a) => a !== '')
            const tempObject = {
                ...template
            };
            for (const pos in splited) {
                tempObject[Object.keys(tempObject)[pos]] = Object.values(splited)[pos];
            }
            total.push(tempObject);
            return total;
        }

    }


}

module.exports = HTMLProcessor;