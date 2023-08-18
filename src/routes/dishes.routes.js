const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticaded);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.patch("/:id", upload.single("dishImage"), (req, res) => {
    console.log(req.file.filename);
    response.json()
});

module.exports = dishesRoutes;