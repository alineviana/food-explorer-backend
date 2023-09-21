const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const image = request.file.filename;
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(image);

    const { name, category, ingredients, price, description } = request.body;
    const user_id = request.user.id;
    const ingredients_array = JSON.parse(ingredients || "[]");

    const [dish_id] = await knex("dishes").insert({
      image: filename,
      name,
      category,
      price,
      description,
      user_id,
    });

    const ingredientsInsert = ingredients_array.map((name) => {
      return {
        name,
        dish_id,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.status(200).json();
  }

  async index(request, response) {
    const { search } = request.query;

    let dishes;

    if (search) {
      const filterDish = search.split(",").map((name) => `%${name}%`);

      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.image",
          "dishes.name",
          "dishes.category",
          "dishes.price",
          "dishes.description",
        ])
        .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .where((dish) => {
          filterDish.forEach((name) => {
            dish.orWhere("dishes.name", "like", name);
            dish.orWhere("dishes.description", "like", name);
            dish.orWhere("ingredients.name", "like", name);
          });
        })
        .groupBy("dishes.id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes").orderBy("name");
    }

    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map((dish) => {
      
      const dishIngredients = dishesIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return response.json(dishesWithIngredients);
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).orderBy("name");
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const imageFilename = request.file?.filename;
    const { name, category, ingredients, oldIngredients, price, description } =
      request.body;
    const ingredients_array = JSON.parse(ingredients || oldIngredients || "[]");

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("O prato não foi encontrado!", 404);
    }

    const updateDish = {
      name: name ?? dish.name,
      category: category ?? dish.category,
      price: price ?? dish.price,
      description: description ?? dish.description,
    };

    if (imageFilename) {
      const diskStorage = new DiskStorage();

      if (dish.image) {
        await diskStorage.deleteFile(dish.image);
      }

      const filename = await diskStorage.saveFile(imageFilename);

      updateDish.image = filename;
    }

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id });

      const ingredientsInsert = ingredients_array.map((name) => {
        return {
          dish_id: id,
          name,
        };
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    await knex("dishes").where({ id }).update(updateDish);

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishesController;
