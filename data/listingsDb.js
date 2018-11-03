const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)

module.exports = {
    getLists: getLists,
    getList: getList,
    insertNewListing: insertNewListing
}

function getLists(db = conn) {
    return db('listings').select().orderBy('created_at', 'DESC')
}

function getList(id, db = conn) {
    return db('listings').where('id', id).first()
}

function insertNewListing(listing, db = conn) {
    return db('listings')
        .insert([{ member_id: listing.member_id, title: listing.title, image_URL: listing.image_URL, description: listing.description, cost_in_cents: listing.cost_in_cents, category_id: listing.category_id,  }])
}

function updateListing(listing, db = conn) {
    return db('listings')
        .update([{ title: listing.title, image_URL: listing.image_URL, description: listing.description, cost_in_cents: listing.cost_in_cents }])
}
