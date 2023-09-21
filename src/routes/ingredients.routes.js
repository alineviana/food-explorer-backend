const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/:id", ensureAuthenticaded, ingredientsController.show);

module.exports = ingredientsRoutes;