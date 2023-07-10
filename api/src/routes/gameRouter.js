const { Router } = require("express");

const {
  getByIdVideogamesHandler,
  getVideogamesHandler,
  createVideogameHandler,
} = require("../handlers/getGameHandler");

const gameRouter = Router();

gameRouter.get("/:id", getByIdVideogamesHandler);

// En esta ruto unificamos Get/quiery y Get/videogames.

gameRouter.get("/", getVideogamesHandler);

gameRouter.post("/", createVideogameHandler);

module.exports = gameRouter;
