
exports.up = function(knex, Promise) {
    return knex.schema.createTable('loans', table => {
        table.increments('id').primary()
        table.integer('listing_id') // single item/listing per loan for MVP
        table.integer('borrower_id')
        table.integer('costs_in_cents').defaultTo(0)
        table.text('notes')
        table.dateTime('created_at').defaultTo(knex.fn.now())
    }
)
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('loans')
};
