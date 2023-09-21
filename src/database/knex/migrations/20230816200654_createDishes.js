exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("image").default(null);
    table.text("name").notNullable();
    table.text("category").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.text("description").notNullable();
    
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("dishes");