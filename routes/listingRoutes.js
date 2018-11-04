const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const categoriesDb = require('../data/categoriesDb')
const nav = { listings: true }

router.get('/', (req, res) => {
    // get the list data
    listingsDb.getListings()
            .then(listings => {
            res.render('./listings/index', { listings: listings, nav: {browse: true}, currentUser: membersDb.getCurrentUser() })
        })

    // render the list index view
})

router.get('/new', (req, res) => {
    // const newcate = req.params.name;
    categoriesDb.getCategories()
        .then(categories => {
            let newListing = {}
            res.render('./listings/edit', { categories: categories, nav: nav, listing: newListing, currentUser: membersDb.getCurrentUser() })
        })

})

// get listings for a member, /listings/member/id
// router.get('/member/:id', (req, res) => {
//     // get params
//     const member_id = req.params.id

//     // get user, then get their listings
//     membersDb.getMember(member_id)
//         .then( member => {
//             listingsDb.getListing
//         })
// })

router.get('/:id', (req, res) => {
    //get the list id
    const id = req.params.id;
    //get the listings data
    listingsDb.getListing(id)
        .then(listing => {
            // get the listing owner
            console.log("Listing >>>>>>>>>>>> ", listing)
            membersDb.getMember(listing.member_id)
                .then(owner => {
                    categoriesDb.getCategory(listing.category_id)
                    .then( category => {
                        const viewData = {}
                        viewData.listing = listing
                        viewData.owner = owner
                        viewData.category = category
                        viewData.currentUser = membersDb.getCurrentUser()
                        viewData.nav = nav
                        // console.log("View Data >>>>>> ", viewData)
                        res.render('./listings/view', viewData)
                    })
                })
        })
})



router.get('/:id/edit', (req, res) => {
    // get the params
    const listing_id = req.params.id

    // get form requirements... i.e. categories list... returns an array
    categoriesDb.getCategories()
        .then(categories => {
            // get the listing from db ... should return a single object
            listingsDb.getListing(listing_id)
                .then(listing => {
                    // sort the categories with listing category at top (so it shows as the selected category)
                    categories.sort((category_a, category_b) => {
                        if (category_a.id == listing.category_id) {
                            return -1
                        } else {
                            return 1
                        }
                    })

                    // console.log("Listing >>>> ", listing)
                    res.render('./listings/edit', { categories: categories, listing: listing, nav: nav, currentUser: membersDb.getCurrentUser() })
                })

        })

})


router.post('/edit', (req, res) => {
    // console.log(">>>> New Listing request data >>>>>>", req.body)
    const newListing = {
        member_id: membersDb.getCurrentUser().id,
        title: req.body.title,
        description: req.body.description,
        image_URL: req.body.image_URL,
        category_id: req.body.category_id,
        cost_in_cents: req.body.cost_in_cents,
        category_id: req.body.category_id
    }
    // console.log("New Listing >>>>>>>>>>>>>>>>>>>", newListing)
    listingsDb.insertNewListing(newListing)

        .then((newListingId) => {
            // console.log(newListings)
            res.redirect('/listings/' + newListingId)
        })
})



module.exports = { listingsRouter: router }
