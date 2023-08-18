const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, category, ingredients, price, description } = request.body;
    const user_id = request.user.id;

    const [ dish_id ] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ id }).orderBy("name");

    return response.json({
        ...dish,
        ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { name, ingredients } = request.query;
    const user_id = request.user.id;

    let dishes;

    if(ingredients) {
      
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.user_id"
      ])
      .where("dishes.user_id", user_id)
      .whereLike("dishes.name", `%${name}%`)
      .whereIn("ingredients.name", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .orderBy("dishes.name")

    } else {
      
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients").where({ user_id });
    const dishWithIngredients = dishes.map(dish => {
      
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);
      
      return {
        ...dish,
        ingredients: dishIngredients
      }
    });
    
    return response.json(dishWithIngredients);
  }
}

module.exports = DishesController;
