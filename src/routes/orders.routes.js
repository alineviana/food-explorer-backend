const { Router } = require("express");

const ordersRoutes = Router();

const OrdersController = require("../controllers/OrdersController");

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticaded);

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:order_id/:user_id", ordersController.delete);

module.exports = ordersRoutes;