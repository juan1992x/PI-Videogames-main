const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gameRouter = require("./gameRouter");
const genresRouter = require("./genresRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// !! Recordar que para modularizar las rutas estamos usando un middleware... por eso es "router.use()"

router.use("/videogames", gameRouter);
router.use("/genres", genresRouter);

module.exports = router;
