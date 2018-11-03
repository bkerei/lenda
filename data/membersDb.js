const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

let currentUser = {};

module.exports = {
  getMembers: getMembers,
  getMember: getMember,
  getMemberByEmail: getMemberByEmail, 
  getCurrentUser: getCurrentUser,
  setCurrentUser: setCurrentUser,
  insertNewMember: insertNewMember
}

function getMembers(db = conn) {
  return db('members').select().orderBy('name')
}

function getMember(id, db = conn) {
  return db('members').where('id', id).first()
}

function getMemberByEmail(email, db = conn) {
  return db('members').where('email', email).first()
}


function getCurrentUser() {
  // console.log("getting current user >>>>> ", currentUser)
  return currentUser || 1
}

function setCurrentUser(user) {
  // console.log("Setting current user >>>>> ", user)
  currentUser = user
  // console.log("Current user is now >>>>> ", currentUser)

  return currentUser
}
function insertNewMember(profile, db = conn) {
  return db('members')
    .insert([{ name: profile.name, username: profile.username, email: profile.email, image_URL: profile.image_URL, about_me: profile.about_me }])
}
