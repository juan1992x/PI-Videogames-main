require("dotenv").config();
const { API_KEY } = process.env;
const {
  createVideogame,
  findByIdVideogame,
  getAllGame,
  searchGameByname,
} = require("../controllers/gameController");

const getByIdVideogamesHandler = async (req, res) => {
  const { id } = req.params;
  const search = isNaN(id) ? "BDD" : "API";
  try {
    const findId = await findByIdVideogame(id, search);
    // console.log(findId);
    res.status(200).json(findId);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createVideogameHandler = async (req, res) => {
  try {
    const { name, description, platforms, image, launchDate, rating, genres } =
      req.body;
    const newVideogame = await createVideogame(
      name,
      description,
      platforms,
      image,
      launchDate,
      rating
      // genres
    );
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getVideogamesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const results = name ? await searchGameByname(name) : await getAllGame();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getByIdVideogamesHandler,
  getVideogamesHandler,
  createVideogameHandler,
};
