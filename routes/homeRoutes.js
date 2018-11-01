const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')


router.get('/', (req, res) => {
    res.redirect('/listings')
})








module.exports = {homeRouter: router}