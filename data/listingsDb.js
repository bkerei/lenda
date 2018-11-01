const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
    getLists: getLists,
    getList: getList
}

function getLists(db = conn) {
    return db('listings').select()
}

function getList(id, db = conn) {
    return db('listings').where('id', id).first()
}