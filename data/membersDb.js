const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
  getMembers: getMembers,
  getMember: getMember
}

function getMembers(db = conn) {
  return db('members').select().orderBy('name')
}

function getMember(id, db = conn) {
  return db('members').where('id', id).first()
}
