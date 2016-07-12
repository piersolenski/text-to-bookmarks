const netscape = require('netscape-bookmarks');
const fs = require('fs');

const pipe = fns => (x) => fns.reduce((v, f) => f(v), x)

const getData = url => fs.readFileSync(url, 'utf-8')

const textListToArray = text => {
    return text.split('\n')
}

const arrayToObject = arr => {
    return arr.reduce((result, item) => {
        result[urlToName(item)] = item;
        return result;
    }, {})
}

const objectToBookmarks = obj => {
    return netscape(obj)
}

const urlToName = text => {
    return text
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\#$/, '')
        .replace(/\/$/, '')
}

const makeBookmarks = (src, dest) => {
    const bookmarks = objectToBookmarks(arrayToObject(textListToArray(getData(src))))
    if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    return fs.writeFileSync(dest + '/bookmarks.html', bookmarks)
}

module.exports = makeBookmarks
