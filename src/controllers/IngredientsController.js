const knex = require("../database/knex");

class IngredientsController {
  async show(request, response) {
    const dish_id = request.params;

    const ingredients = await knex("ingredients")
      .where({ dish_id: dish_id.id })
      .groupBy("name");

    return response.json(ingredients);
  }
}

module.exports = IngredientsController;