const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
  getMembers: getMembers,
  getMember: getMember,
  insertNewMember: insertNewMember
}

function getMembers(db = conn) {
  return db('members').select().orderBy('name')
}

function getMember(id, db = conn) {
  return db('members').where('id', id).first()
}

function insertNewMember(profile, db = conn) {
  return db('members')
    .insert([{ name: profile.name, username: profile.username, email: profile.email, image_URL: profile.image_URL, about_me: profile.about_me }])
}