const knex = require("../database/knex");

class OrderHistoryController {
  async create(request, response) {
    const user_id = request.params.id;
    const orderHistory = await knex("orders").where({ user_id });

    let newOrderHistoryDetails = [];
    orderHistory.map((item) => {
      newOrderHistoryDetails.push(`${item.quantity} x ${item.name}`);
    });

    let detailing = newOrderHistoryDetails.join(", ");

    await knex("orderHistory").insert({
      detailing,
      user_id,
    });

    return response.status(200).json();
  }

  async index(request, response) {
    const user_id = request.params.id;
    
    const orderHistory = await knex("orderHistory").where({ user_id });
    
    return response.json(orderHistory);
  }

  async show(request, response) {
    const orderHistory = await knex("orderHistory")

    return response.json(orderHistory);
  }

  async update(request, response) {
    const { code, status } = request.body;

    if (code && status) {
      await knex("orderHistory").where({ id: code }).update({ status });
    }

    return response.json();
  }
}

module.exports = OrderHistoryController;
