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
    res.send('create a new member')
})

router.get('/edit/:id', (req, res) => {
    res.send('edit a member')
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

router.post('/login', (req, res) => {

    res.redirect('/')
    // get the login username and password
    const username = req.body.params.username

    // get the user that has that username
    membersDb.getMemberByUsername(username)
        // set the current logged-in user session-data to be the found user.id
        .then(user => {
            sessionStorage.setItem('currentUserId', user.id);
            sessionStorage.setItem('showMessage', 'Welcome ' + user.name)
            // redirect to home
            res.redirect('/')
        })


})




module.exports = { membersRouter: router }