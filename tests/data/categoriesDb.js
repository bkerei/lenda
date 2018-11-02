const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
getCategory: getCategory,
  getCategories: getCategories
}

function getCategories(db = conn) {
  return db('categories').select().orderBy('name')
}

function getCategory(id, db = conn) {
  return db('categories').where('id', id).first()
}
