const express = require('express')
const router = express.Router()
const listingsDb = require('../data/listingsDb')
const membersDb = require('../data/membersDb')
const loansDb = require('../data/loansDb')
const nav = { community: true }


// GET requests
//

// this should be a post
router.get('/logout', (req, res) => {
    // res.send("log out")
    // console.log("Current user before logout >>>>>---------------------------------- ", membersDb.getCurrentUser())
    membersDb.setCurrentUser({})
    // console.log("Current user after logout >>>>> ", membersDb.getCurrentUser())
    res.redirect('/listings')
})


// members index
router.get('/', (req, res) => {
    // console.log("Current user >>>>>  ", membersDb.getCurrentUser())
    // get the members list data
    membersDb.getMembers()
        .then(members => {
            res.render('./members/index', { members: members, nav: nav, currentUser: membersDb.getCurrentUser() })
        })

    // render the members index view
})

router.get('/new', (req, res) => {
    // console.log("AT MEMBERS/NEW GET                **********************")
    const viewData = {}
    viewData.member = {}
    viewData.nav = { profile: true }
    viewData.currentUser = membersDb.getCurrentUser()
    res.render('./members/edit', viewData)
})

router.get('/:id', (req, res) => {
    // get the user id
    const id = req.params.id

    // get the user data
    membersDb.getMember(id)
        .then(member => {
            // console.log("CurrentUserId:  ", membersDb.getCurrentUser().id, "      viewingProfileId:   ", member.id)
            navTab = membersDb.getCurrentUser().id == member.id ? { profile: true } : { community: true }
            res.render('./members/view', { member: member, nav: { profile: true }, currentUser: membersDb.getCurrentUser() })
        })

    // render the member view view

})


// wrong route... to remove
// router.get('/edit/:id', (req, res) => {
// // res.render('./members/edit')
// res.send('edit a member')
// })

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    membersDb.getMember(id)
        .then(member => {
            // console.log('update member is', member)
            const viewData = {}
            viewData.member = member
            viewData.nav = { profile: true }
            viewData.currentUser = membersDb.getCurrentUser()

            res.render('./members/edit', viewData)
        })

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
                res.redirect('../listings')
                // res.redirect('/members/' + user.id)
            } else {
                // redirect to home
                res.redirect('../listings')
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

router.post('/edit', (req, res) => {
    const member = {
        name: req.body.name,
        email: req.body.email,
        image_URL: req.body.image_URL,
        about_me: req.body.about_me,
        username: req.body.username,
        id: req.body.id
    }
    if (member.id) {
        // member.id = id
        // console.log("Member id from form post >>>>>>>>>>>>>>>>>>   ", member.id)
        membersDb.editMember(member)
            .then((db_update_count) => {
                // console.log("DB CoUNT result:......   ", db_update_count)
                // console.log("EDITED MEMBER >>>>>>>>    ", member.id)
                res.redirect('/members/' + member.id)
            })
            .catch(err => {
                // console.log("EDIT MEMBER ERROR>/............................  ", err)
                res.redirect('/')
            })
    } else {
        membersDb.insertNewMember(member)
            .then((newMemberId) => {
                // console.log('new id is >>>>>>>>>>', newMemberId)
                // console.log('new current user is is >>>>', membersDb.getMember(newMemberId))
                membersDb.getMember(newMemberId[0])
                    .then((member) => {
                        if (member.id == membersDb.getCurrentUser.id ) {
                            membersDb.setCurrentUser(member)
                        }
                        res.redirect('/members/' + newMemberId)
                    })

                // console.log(newmember)

            })
            .catch(err => {
                // console.log("NEW MEMBER ERROR>/............................  ", err)
                res.redirect('/')
            })

    }


})







module.exports = { membersRouter: router }