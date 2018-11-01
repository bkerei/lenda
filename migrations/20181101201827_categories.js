
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('image_URL')
        table.string('description')
        table.dateTime('created_at').defaultTo(knex.fn.now())
    }
)
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
};
