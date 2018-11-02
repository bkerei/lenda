
let supertest = require('supertest');
let cheerio = require('cheerio');
let server =require('../server')

test(" ", (done) => {
    supertest(server).get('/').end(function (err, res) {
        expect(err).toBeNull()
        let expected = ' '
        let $ = cheerio.load(res.text)
        let actual = $(' ').first().text()
        expect(actual).toEqual(expected)

        done()

    })
})

test(" ", (done) => {
    supertest(server).get('/ ').end(function (err, res) {
        console.log(res.text)
        expect(err).toBeNull()
        let expected = ' '
        let $ = cheerio.load(res.text)
        let actual = $(' ').first().text()
        expect(actual).toEqual(expected)

        done()

    })
}) 