const { Router } = require("express");

const orderHistoryRoutes = Router();

const OrderHistoryController = require("../controllers/OrderHistoryController");

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const orderHistoryController = new OrderHistoryController();

orderHistoryRoutes.use(ensureAuthenticaded);

orderHistoryRoutes.post("/:id", orderHistoryController.create);
orderHistoryRoutes.get("/:id", orderHistoryController.index);
orderHistoryRoutes.get("/", orderHistoryController.show);
orderHistoryRoutes.put("/", orderHistoryController.update);

module.exports = orderHistoryRoutes;