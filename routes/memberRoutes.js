const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
// const nav = {community: true}

router.get('/', (req, res) => {
    // console.log("Current user >>>>>  ", membersDb.getCurrentUser())
    // get the members list data
    membersDb.getMembers()
        .then(members => {
            res.render('./members/index', { members: members, nav: { community: true }, currentUser: membersDb.getCurrentUser() })
        })

    // render the members index view
})

router.get('/new', (req, res) => {
    res.render('./members/edit')
})

router.get('/logout', (req, res) => {
    // res.send("log out")
    // console.log("Current user before logout >>>>>---------------------------------- ", membersDb.getCurrentUser())
    membersDb.setCurrentUser({})
    // console.log("Current user after logout >>>>> ", membersDb.getCurrentUser())
    res.redirect('/')
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
            res.render('./members/view', { member: member, nav: { profile: true }, currentUser: membersDb.getCurrentUser() })
        })

    // render the member view view

})


// Post requests


router.post('/login', (req, res) => {

    // get the login username and password
    const email = req.body.email

    // get the user that has that username
    membersDb.getMemberByEmail(email || 'user1@example.com')
        // set the current logged-in user session-data to be the found user.id
        .then(user => {
            // sessionStorage.setItem('currentUserId', user.id);
            // sessionStorage.setItem('showMessage', 'Welcome ' + user.name)
            if (user) {
                // console.log("about to set user, current user is >>>> ", membersDb.getCurrentUser())
                membersDb.setCurrentUser(user)
                // console.log("Just set user, current user is now >>>> ", membersDb.getCurrentUser())
                res.redirect('/members/' + user.id)
            } else {
                // redirect to home
                res.redirect('/')
            }
        })
}
)

router.post('/new', (req, res) => {
    const newmember = {
        name: req.body.name,
        email: req.body.email,
        image_URL: req.body.image_URL,
        about_me: req.body.about_me,
        username: req.body.username
    }

    membersDb.insertNewMember(newmember)
        .then((newMemberId) => {
            // console.log(newmember)
            res.redirect('/members/' + newMemberId)
        })
})










module.exports = { membersRouter: router }