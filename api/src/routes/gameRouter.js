const { Router } = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configura multer para guardar archivos en una carpeta 'uploads'
const {
  getByIdVideogamesHandler,
  getVideogamesHandler,
  createVideogameHandler,deleteCreatedGamesHandler
} = require("../handlers/getGameHandler");

const gameRouter = Router();

gameRouter.get("/:id", getByIdVideogamesHandler);

// En esta ruto unificamos Get/quiery y Get/videogames.

gameRouter.get("/", getVideogamesHandler);

gameRouter.post("/", upload.single('image'), createVideogameHandler);
gameRouter.delete("/created", deleteCreatedGamesHandler);
module.exports = gameRouter;
