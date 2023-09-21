const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const ingredientsRouter = require("./ingredients.routes");
const sessionsRouter = require("./sessions.routes");
const favoritesRouter = require("./favorites.routes");
const ordersRouter = require("./orders.routes");
const orderHistoryRouter = require("./orderHistory.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/order", ordersRouter);
routes.use("/orderhistory", orderHistoryRouter);

module.exports = routes;