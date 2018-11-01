
exports.up = function(knex, Promise) {
    return knex.schema.createTable('listings', table => {
        table.increments('id').primary()
        table.string('title')
        table.integer('member_id')
        table.string('image_URL')
        table.text('description')
        table.integer('cost_in_cents').defaultTo(0)
        table.dateTime('created_at').defaultTo(knex.fn.now())
    }
)
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings')
};
