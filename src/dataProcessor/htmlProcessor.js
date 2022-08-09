const cheerio = require('cheerio')
const fs = require('fs')
class HTMLProcessor{
    constructor(text){
        this.text = text;
        this.$ = this._textToHtml(this.text);
        fs.writeFileSync('./test.txt', text);
    };
    _textToHtml(text){
        return cheerio.load(text);
    }
    async process(){
        const table = this.$('tbody')
        const row = table.find('tr a');
        const nextRow = table.find('tr').next().find('a');
        // parent,prev,next,startIndex,endIndex,children,name,attribs,type,namespace,x-attribsNamespace,x-attribsPrefix
        const childs = [...table.find("tr a").toString().matchAll(/\>\w+\</g)].map(data=>data[0].match(/\w+/));

        
        const result = `
        ${row.html()}
        ${nextRow.html()}
        children
        ${childs[0]}
        `
        return result

    }


}

module.exports = HTMLProcessor;