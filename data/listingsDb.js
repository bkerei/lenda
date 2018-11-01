const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
    getLists: getLists,
    getList: getList,
    getNewList: getNewList
}

function getLists(db = conn) {
    return db('listings').select().orderBy('title')
}

function getList(id, db = conn) {
    return db('listings').where('id', id).first()
}

function getNewList(newlist, db = conn) {
    return db('listings')
        .insert([{
            title: newlist.title,
            description: newlist.description,
            img_URL: newlist.img_URL
        }])
}