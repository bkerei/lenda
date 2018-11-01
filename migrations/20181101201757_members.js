
exports.up = function(knex, Promise) {
    return knex.schema.createTable('members', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('image_URL')
        table.string('username')
        table.string('email')
        table.string('town')
        table.text('about_me')
        table.dateTime('created_at').defaultTo(knex.fn.now())
    }
)
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('members')
};
