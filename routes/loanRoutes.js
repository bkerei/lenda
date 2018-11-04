const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const nav = {bookings: true}

router.get('/', (req, res) => {
    // loans from db // future, filter by borrower or lender/owner 
    const loans = []
    
    // this will need to be a join query
    // as we need to bring back loan item details
    // and item owner, and borrowing member details

    const viewData = {}
    viewData.loans = loans
    viewData.nav = nav
    viewData.currentUser = membersDb.getCurrentUser()

    res.render('./loans/index', viewData)
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