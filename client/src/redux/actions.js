import axios from "axios";
import {
  GET_BY_ID,
  GET_GENRES,
  GET_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  SEARCH_GAMES
} from "./actionsTypes";

export const getVideoGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/videogames");
    const games = apiData.data; // Verifica que cada juego en 'games' tenga un campo 'genres'
    dispatch({ type: GET_VIDEOGAMES, payload: games });
  };
};

export const searchGames = (searchTerm) => {
  return async function (dispatch) {
    try {
      let apiData;
      if (!isNaN(parseInt(searchTerm)) && searchTerm >= 1 && searchTerm <= 100) {
        apiData = await axios.get(`http://localhost:3001/videogames/${searchTerm}`);
      } else {
        apiData = await axios.get(`http://localhost:3001/videogames?name=${searchTerm}`);
      }
      dispatch({ type: SEARCH_GAMES, payload: apiData.data });
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/genres`);
    const genres = apiData.data; // Asegúrate de que esto es un arreglo de géneros
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const getById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const detailGame = apiData.data;
    dispatch({ type: GET_BY_ID, payload: detailGame });
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
  return function (dispatch, getState) {
    const { videoGames } = getState();
    let filteredGames;

    if (origin === 'API') {
      filteredGames = videoGames.filter(game => game.origin === 'API');
    } else if (origin === 'Database') {
      filteredGames = videoGames.filter(game => game.origin === 'Database');
    } else {
      filteredGames = [...videoGames]; // Para volver al estado inicial
    }

    dispatch({ type: FILTER_BY_ORIGIN, payload: filteredGames });
  };
};
export const sortBy = (type, order) => {
  return {
    type: 'SORT_BY',
    payload: { type, order }
  };
};

// Ejemplo de acción resetFilters
export const resetFilters = () => {
  return {
    type: 'RESET_FILTERS'
  };
};

export const deleteCreatedGames = () => {
  return async (dispatch) => {
    try {
      await axios.delete('http://localhost:3001/videogames/created');
      // Aquí puedes despachar cualquier acción adicional que necesites
      // Por ejemplo, para recargar los juegos desde el backend
      dispatch(getVideoGames());
    } catch (error) {
      console.error('Error al eliminar los juegos creados:', error);
    }
  };
};
