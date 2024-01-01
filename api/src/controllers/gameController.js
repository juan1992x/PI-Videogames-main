require("dotenv").config();
// Aqui vamos a poder trabajar con el Modelo ya creado para la BDD, para ello lo importamos.

const { Videogames,Genres } = require("../db");
const {Sequelize, Op } = require("sequelize");
const { findGenres } = require("./genreController");//trae los generos De la bdd
const { setGameCache, getGameCache } = require("../cache/Cachegamer");
const { API_KEY } = process.env;
const axios = require("axios");
const { cleanArray } = require("../utils/functionsExtras");

// Url api externa
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Con esta funcion asicnronica creamos el Videojuego en la BDD para luego requerirlo en en Handler..
// funcionando -------
const createVideogame = async (name, description, platforms, image, launchDate, rating, genresIds) => {
  const newGame = await Videogames.create({
    name,
    description,
    platforms,
    image,
    launchDate,
    rating
  });

  if (genresIds && genresIds.length) {
    const genres = await Genres.findAll({
      where: { id: { [Op.in]: genresIds } }
      
    });
    await newGame.setGenres(genres);
  }

  // Obtener el juego con géneros para la respuesta
  console.log("Géneros encontrados:", genres);
  const gameWithGenres = await Videogames.findByPk(newGame.id, {
    include: [{ model: Genres }]
    
  });

  return gameWithGenres;
};
// Get/ById // funcionando-----
const findByIdVideogame = async (id) => {
  // Intenta encontrar el juego en la API
  try {
    const gameFromAPI = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    return gameFromAPI;
  } catch (apiError) {
    // Si el juego no está en la API, busca en el caché
    const allGames = getGameCache();
    const numericId = parseInt(id);

    if (numericId >= 1 && numericId <= 100) {
      const gameInCache = allGames[numericId - 1]; // Usar el ID como índice en el caché (asumiendo que el conteo comienza en 1)
      if (gameInCache) return gameInCache;
    }

    throw new Error(`No se encontró el videojuego con el ID: ${id}. La búsqueda de juegos por ID es efectiva solo para los primeros 100 juegos.`);
  }
};
//Get all games
// Funcionando -------
const getAllGame = async () => {
  // Revisa si los juegos ya están en el caché
  let cachedGames = getGameCache();
  if (cachedGames) {
    return cachedGames;
  }

  // Obtener géneros de la base de datos
  const genresFromDB = await findGenres();

  // Buscar todos los juegos en la base de datos e incluir géneros
  const dbGames = await Videogames.findAll({
    include: [{ model: Genres, through: { attributes: [] } }]
  });

  // Verifica que estés obteniendo juegos de la base de datos
  //console.log("Juegos de la Base de Datos:", dbGames);

  // Buscar juegos en la API en paquetes de 20 hasta llegar a 100
  let apiGames = [];
  for (let i = 0; i < 5; i++) {
    const url = `${URL}&page=${i + 1}&page_size=20`;
    const apiGamesPage = (await axios.get(url)).data.results;
    const processedApiGames = apiGamesPage.map(game => {
      const gameGenres = game.genres.map(apiGenre => {
        const dbGenre = genresFromDB.find(dbGenre => dbGenre.name === apiGenre.name);
        return dbGenre || apiGenre;
      });

      return { ...game, genres: gameGenres };
    });

    apiGames = apiGames.concat(processedApiGames);
  }

  // Combinar juegos de la base de datos y de la API, limitando a 100 en total
  const allGames = [...dbGames, ...apiGames].slice(0, 100);
  setGameCache(allGames);

  return allGames;
};

// Get by query
const searchGameByname = async (name) => {
  try {
    // Asumiendo que API_KEY ya está importado desde tus variables de entorno
    const databaseVideogames = await Videogames.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` } // Búsqueda insensible a mayúsculas/minúsculas
      },
      include: [{ model: Genres, through: { attributes: [] } }], // Incluir géneros
      limit: 15 // Limitar a 15 resultados
    });

    let errorMessage = '';
    if (databaseVideogames.length === 0) {
      errorMessage = 'No hay coincidencia en base de datos para el juego solicitado';
    }

    const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
    const apiVideogames = apiResponse.data.results || [];
    
    const results = {
      databaseVideogames,
      apiVideogames,
      error: errorMessage || (databaseVideogames.length === 0 && apiVideogames.length === 0) ? 'No se encontraron videojuegos con ese nombre' : ''
    };

    return results;
  } catch (error) {
    throw new Error(`Error searching videogames by name: ${error.message}`);
  }
};


//FUNCIONES EXTRAS 
//FUNCION PARA ELIMINAR LOS JUEGOS CREADOS DE LA BASE DE DATOS 
const deleteCreatedGames = async () => {
  await Videogames.destroy({
    where: { created: true }
  });
};



module.exports = {
  createVideogame,
  findByIdVideogame,
  searchGameByname,
  getAllGame
  
};
