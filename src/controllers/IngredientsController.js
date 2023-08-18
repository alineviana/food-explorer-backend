const knex = require("../database/knex");

class IngredientsController {
    async index(request, response) {
        const user_id = request.user.id;

        const ingredients = await knex("ingredients").where({ user_id });

        return response.json(ingredients);
    }
}

module.exports = IngredientsController;