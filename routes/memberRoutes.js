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

// used for register
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
        .then(member => {
            res.render('./members/view', { member: member, nav: { profile: true } })
        })

    // render the member view view

})

router.get('/logout', (req, res) => {
    console.log("Current user 1 >>>>> ", server.getCurrentUserId)
    membersDb.setCurrentUserId = 0
    res.redirect('/')
})

router.post('/login', (req, res) => {

    // get the login username and password
    const email = req.body.email

    // get the user that has that username
    membersDb.getMemberByEmail(email)
        // set the current logged-in user session-data to be the found user.id
        .then(user => {
            // sessionStorage.setItem('currentUserId', user.id);
            // sessionStorage.setItem('showMessage', 'Welcome ' + user.name)
            if (user) {
                membersDb.setCurrentUser = user
                res.redirect('/members/' + user.id)
            } else {
            // redirect to home
            res.redirect('/')
        }
        })
}
)






module.exports = { membersRouter: router }