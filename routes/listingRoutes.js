const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const nav = {listings: true}

router.get('/', (req, res) => {
    res.send('listings index')
})

router.get('/:id', (req, res) => {
    res.send('a listing view')
})

router.get('/new', (req, res) => {
    res.send('create a new listing')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a listing')
})



module.exports = {listingsRouter: router}