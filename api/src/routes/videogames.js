/*const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta GET /videogames
router.get('/', async (req, res) => {
  try {
    // Obtener la lista de videojuegos de la API rawg.io
    const response = await axios.get('https://api.rawg.io/api/games', {
      headers: {
        'User-Agent': 'axios',
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    // Obtener el arreglo de videojuegos desde la respuesta
    const videogames = response.data.results;

    // Enviar la respuesta con los videojuegos
    res.json(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los videojuegos' });
  }
});

module.exports = router;*/