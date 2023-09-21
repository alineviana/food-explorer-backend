const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { name, total_price, quantity, dish_id, user_id } = request.body;
    console.log(quantity)

    const [checkIfExist] = await knex("orders")
      .where({ dish_id })
      .where({ user_id });

    if (checkIfExist) {
      await knex("orders").where({ dish_id }).increment("total_price", total_price).increment("quantity", quantity);
    } else {
      await knex("orders").insert({
        name,
        user_id,
        dish_id,
        quantity,
        total_price,
      });
    }

    return response.status(201).json();
  }

  async show(request, response) {
    const user_id = request.params.id;

    const orders = await knex("orders")
      .select(["orders.id", "dishes.name", "dishes.image", "dishes.price", "orders.quantity", "orders.total_price"])
      .innerJoin("dishes", "orders.dish_id", "dishes.id")
      .where("orders.user_id", user_id);

    return response.json(orders);
  }

  async delete(request, response) {
    const order_id = request.params.order_id;
    const user_id = request.params.user_id;
    console.log(order_id)
    console.log(request.params)
   
    
    await knex("orders").where({ id: order_id }).delete();
    

    return response.json();
  }
}

module.exports = OrdersController;