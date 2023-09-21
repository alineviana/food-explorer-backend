exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.text("name");
    
    table.integer("user_id").references("id").inTable("users");
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");

    table.integer("quantity");
    table.decimal("total_price", 10, 2);

    table.timestamp("created_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("orders");