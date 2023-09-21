const { Router } = require("express");

const favoritesRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");

const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticaded);

favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.get("/check", favoritesController.show);
favoritesRoutes.delete("/:user_id/:id", favoritesController.delete);

module.exports = favoritesRoutes;