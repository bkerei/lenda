const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const nav = {listings: true}

router.get('/', (req, res) => {
    // get the list data
    listingsDb.getLists()
        .then(listings => {
            res.render('./listings/index', { listings: listings, nav: nav })
        })

    // render the list index view
})

router.get('/:id', (req, res) => {
    //get the list id
    const id = req.params.id;
    //get the listings data
    listingsDb.getList(id)
        .then(listings => {
            res.render('./listings/view', { listings: listings, nav: nav })
        })
})

router.get('/new', (req, res) => {
    res.render('./listings/edit')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a listing')
})



module.exports = { listingsRouter: router }