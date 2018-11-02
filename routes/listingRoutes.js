const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const categoriesDb = require('../data/categoriesDb')
const nav = { listings: true }

router.get('/', (req, res) => {
    // get the list data
    listingsDb.getLists()
        .then(listings => {
            res.render('./listings/index', { listings: listings, nav: nav, currentUser: membersDb.getCurrentUser() })
        })

    // render the list index view
})

router.get('/new', (req, res) => {
    const newcate = req.params.name;
    categoriesDb.getCategories()
        .then(categories => {
            let newMember = {}
            res.render('./listings/edit', { categories: categories, member: newMember, currentUser: membersDb.getCurrentUser() })
        })

})

router.post('/new', (req, res) => {
    // console.log("we hit the post route")
    const newListings = {
        title: req.body.title,
        description: req.body.description,
        image_URL: req.body.image_URL,
        cost_in_cents: req.body.cost_in_cents,
    }
    // console.log(newListings)
    listingsDb.insertNewListing(newListings)

        .then((newListings) => {
            // console.log(newListings)
            res.redirect('./index')
        })
})

router.get('/:id', (req, res) => {
    //get the list id
    const id = req.params.id;
    //get the listings data
    listingsDb.getList(id)
        .then(listings => {
            res.render('./listings/view', { listings: listings, nav: nav, currentUser: membersDb.getCurrentUser() })
        })
})



router.get('/edit/:id', (req, res) => {
    res.send('edit a listing')
})



module.exports = { listingsRouter: router }