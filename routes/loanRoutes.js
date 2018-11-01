const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const nav = {bookings: true}

router.get('/', (req, res) => {
    res.send('loans index')
})

router.get('/:id', (req, res) => {
    res.send('a loan view')
})

router.get('/new', (req, res) => {
    res.send('create a new loan')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a loan')
})



module.exports = {loansRouter: router}