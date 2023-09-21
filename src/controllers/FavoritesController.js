const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const { dish_id } = request.body;
    const user_id = request.user.id;

    const favorite = await knex("favorites").insert({
      dish_id,
      user_id,
    });

    return response.json(favorite);
  }

  async index(request, response) {
    const { user_id } = request.query;

    const favorites = await knex("favorites")
      .select(["favorites.id", "dishes.name", "dishes.image"])
      .innerJoin("dishes", "favorites.dish_id", "dishes.id")
      .where("favorites.user_id", user_id)
      .groupBy("dishes.id")
      .orderBy("dishes.name");

    return response.json(favorites);
  }

  async show (request, response) {
    const { dish_id, user_id } = request.query;

    const favorites = await knex("favorites").where({ dish_id, user_id });
    const isFavorite = favorites.length > 0;

    return response.json({ isFavorite });
  }

  async delete(request, response) {
    const { user_id, id } = request.params;

    await knex("favorites").where({ user_id, id }).delete();

    return response.json();
  }
}

module.exports = FavoritesController;