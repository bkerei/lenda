const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')

router.get('/', (req, res) => {
    // get the list data
    listingsDb.getLists()
        .then(listings => {
            res.render('./listings/index', { listings: listings })
        })

    // render the list index view
})

router.get('/:id', (req, res) => {
    //get the list id
    const id = req.params.id;
    //get the listings data
    listingsDb.getList(id)
        .then(listings => {
            res.render('./listings/view', listings)
        })
})

router.get('/new', (req, res) => {
    res.send('create a new listing')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a listing')
})



module.exports = { listingsRouter: router }