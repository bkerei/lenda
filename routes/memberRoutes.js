const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
// const nav = {community: true}

router.get('/', (req, res) => {
    // get the members list data
    membersDb.getMembers()
        .then(members => {
            res.render('./members/index', { members: members, nav: { community: true } })
        })

    // render the members index view
})

router.get('/new', (req, res) => {
    res.render('./members/edit')
})
router.post('/new', (req, res) => {
    const newmember = {
        name: req.body.name,
        email: req.body.email,
        image_URL: req.body.image_URL,
        about_me: req.body.about_me,
        username: req.body.username
    }

    membersDb.insertNewMember(newmember)
        .then((newmember) => {
            console.log(newmember)
            res.redirect('/members/' + newmember)
        })
})

router.get('/:id/edit', (req, res) => {
    const member = {
        name: req.body.name,
        email: req.body.email,
        image_URL: req.body.image_URL,
        about_me: req.body.about_me,
        username: req.body.username
    }
    membersDb.editMember(member)
        .then((member) => {
            console.log(member)
            res.render('./members/edit' + member)
        })

})


router.get('/:id/edit', (req, res) => {
    membersDb.editMember()
        .then(member => {
            console.log('update member is', member)
            res.render('./members/update' + member)
        })

})


router.get('/:id', (req, res) => {
    // get the user id
    const id = req.params.id

    // get the user data
    membersDb.getMember(id)
        .then(member => {
            res.render('./members/view', { member: member, nav: { profile: true } })
        })

    // render the member view view

})




module.exports = { membersRouter: router }