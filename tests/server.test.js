
let supertest = require('supertest');
let cheerio = require('cheerio');
let server =require('../server')

test("check landing page is working", (done) => {
    supertest(server).get('/').end(function (err, res) {
        expect(err).toBeNull()
        let expected = 'Blue dress'
        let $ = cheerio.load(res.text)
        let actual = $('Blue dress').first().text()
        expect(actual).toEqual(expected)

        done()

    })
})

