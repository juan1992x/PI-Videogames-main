import axios from "axios";
import {
  GET_BY_ID,
  GET_GENRES,
  GET_VIDEOGAMES,
  GET_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
} from "./actionsTypes";

export const getVideoGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/videogames");
    const games = apiData.data;
    dispatch({ type: GET_VIDEOGAMES, payload: games });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/genres`);
    const game = apiData.data;
    dispatch({ type: GET_GENRES, payload: game });
  };
};

export const getById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const detailGame = apiData.data;
    dispatch({ type: GET_BY_ID, payload: detailGame });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    const nameGame = apiData.data;
    dispatch({ type: GET_BY_NAME, payload: nameGame });
  };
};

export const filterByGenre = (genre) => {
  return function (dispatch, getState) {
    const { videoGames } = getState();
    const filteredGames = videoGames.filter((game) =>
      game.genres.includes(genre)
    );
    dispatch({ type: FILTER_BY_GENRE, payload: filteredGames });
  };



};

export const filterByOrigin = (origin) => {
  return { type: FILTER_BY_ORIGIN, payload: origin };
};
