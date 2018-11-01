const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')

router.get('/', (req, res) => {
    // get the members list data
    membersDb.getMembers()
        .then(members => {
            res.render('./members/index', { members: members })
        })

    // render the members index view
})

router.get('/:id', (req, res) => {
    // get the user id
    const id = req.params.id

    // get the user data
    membersDb.getMember(id)
        .then(member => {
            res.render('./members/view', member)
        })

    // render the member view view

})

router.get('/new', (req, res) => {
    res.send('create a new member')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a member')
})



module.exports = { membersRouter: router }