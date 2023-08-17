exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("image");
    table.text("name");
    table.text("category");
    table.text("price");
    table.text("description");
    
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("dishes");