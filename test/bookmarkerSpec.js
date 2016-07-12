const test = require('tape')
const rewire = require('rewire')
const bookmarker = rewire('../lib/bookmarker')

test('It reads a file', assert => {
    const getData = bookmarker.__get__('getData');
    const url = './data/bookmarks.txt'
    const actual = getData(url).length > 0
    const expected = true

    assert.deepEqual(actual, expected, `${actual} should be ${expected}`)
    assert.end();
});

test('It converts a text list to an array', assert => {
    const textListToArray = bookmarker.__get__('textListToArray');
    const textList = `one
two
three`;
    const actual = textListToArray(textList)
    const expected = ['one', 'two', 'three']

    assert.deepEqual(actual, expected, `${actual} should be ${expected}`)
    assert.end();
});

test('It converts an array to an object', assert => {
    const arrayToObject = bookmarker.__get__('arrayToObject');
    const arr = ['one', 'two', 'three']
    const actual = arrayToObject(arr)
    const expected = {
        'one': 'one',
        'two': 'two',
        'three': 'three'
    }

    assert.deepEqual(actual, expected, `${actual} should be ${expected}`)
    assert.end();
});

test('It converts a URL into a name', assert => {
    const urls = [
        'http://www.google.com/',
        'https://www.google.com/',
        'https://www.google.com/#'
    ];
    const urlToName = bookmarker.__get__('urlToName');
    const expected = 'google.com'

    urls.forEach(url => {
        const actual = urlToName(url)
        assert.deepEqual(actual, expected, `${url} should become ${expected}`)
    })
    assert.end();
});


test('It converts an object to bookmark markup', assert => {
    const objectToBookmarks = bookmarker.__get__('objectToBookmarks');
    const obj = {
        0: 'one',
        1: 'two',
        2: 'three'
    }
    const actual = objectToBookmarks(obj).substring(0, 35)
    const expected = '<!DOCTYPE NETSCAPE-Bookmark-file-1>'

    assert.deepEqual(actual, expected, `${actual} should be ${expected}`)
    assert.end();
});
