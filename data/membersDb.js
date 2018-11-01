const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

let currentUser = {};

module.exports = {
  getMembers: getMembers,
  getMember: getMember,
  getMemberByEmail: getMemberByEmail 
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


function getCurrentUserId() {
  return currentUserId
}

function setCurrentUserId(user) {
  return currentUserId = user
}
