const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
// const nav = {community: true}

router.get('/', (req, res) => {
    // get the members list data
    membersDb.getMembers()
        .then( members => {
            res.render('./members/index', {members: members, nav: {community: true}})
        })

    // render the members index view
})

router.get('/new', (req, res) => {
    
    
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a member')
})

router.get('/:id', (req, res) => {
    // get the user id
    const id = req.params.id

    // get the user data
    membersDb.getMember(id)
        .then( member => {
            res.render('./members/view', {member: member, nav: {profile: true}})
        })

    // render the member view view

})




module.exports = { membersRouter: router }