const { findGenres } = require("../controllers/genreController");

const getGenresHandler = async (req, res) => {
  try {
    const genres = await findGenres();
    // console.log(genres);
    res.status(201).json(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getGenresHandler };
