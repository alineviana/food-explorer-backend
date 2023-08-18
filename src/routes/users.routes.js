const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticaded, usersController.update);

module.exports = usersRoutes;