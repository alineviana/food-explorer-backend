exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.boolean("isAdmin");
});

exports.down = knex => knex.schema.dropTable("users");