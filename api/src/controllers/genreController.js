const axios = require("axios");
const { API_KEY } = process.env;
const { Genres } = require("../db");

const findGenres = async () => {
  const response = (
    await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  ).data.results;
  const allGenres = [];
  for (let i = 0; i < response.length; i++) {
    const newGenres = Genres.findOrCreate({
      where: { name: response[i].name },
    });
    // [...allGenres, response[i].id, response[i].name];
    allGenres.push({ id: response[i].id, name: response[i].name });
  }

  // console.log(allGenres);
  return allGenres;
};

module.exports = { findGenres };
