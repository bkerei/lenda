const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')

router.get('/', (req, res) => {
    res.send('members index')
})

router.get('/:id', (req, res) => {
    res.send('a member view')
})

router.get('/new', (req, res) => {
    res.send('create a new member')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a member')
})



module.exports = {membersRouter: router}