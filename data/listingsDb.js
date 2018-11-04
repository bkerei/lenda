const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const conn = require('knex')(config)


function getListings(db = conn) {
    return db('listings').select().orderBy('created_at', 'DESC')
}

function getListing(id, db = conn) {
    return db('listings').where('id', id).first()
}

function insertNewListing(listing, db = conn) {
    return db('listings')
        .insert([{ member_id: listing.member_id, title: listing.title, image_URL: listing.image_URL, description: listing.description, cost_in_cents: listing.cost_in_cents, category_id: listing.category_id,  }])
}

// Not used?
function updateListing(listing, db = conn) {
    return db('listings')
        .update([{ 
            title: listing.title, 
            image_URL: listing.image_URL, 
            description: listing.description, 
            cost_in_cents: listing.cost_in_cents 
        }])
        .where('id', listing.id)
}

module.exports = {
    getListings: getListings,
    getListing: getListing,
    insertNewListing: insertNewListing,
    updateListing: updateListing
}
