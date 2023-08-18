const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/", ensureAuthenticaded, ingredientsController.index);

module.exports = ingredientsRoutes;