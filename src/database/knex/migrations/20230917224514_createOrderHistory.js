exports.up = knex => knex.schema.createTable("orderHistory", table => {
    table.increments("id");

    table.varchar("status").default('Pendente');
    table.varchar("detailing");

    table.integer("user_id").references("id").inTable("users");
    
    table.timestamp("created_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("history");