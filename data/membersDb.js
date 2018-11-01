const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const db = require('knex')(config)

module.exports = {
  getMembers: getMembers,
  
}

function getMembers(testConn = db) {
  const conn = testConn
  return conn('members').select().orderBy('name')
}
