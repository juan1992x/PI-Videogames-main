import {
  GET_GENRES,
  GET_VIDEOGAMES,
  GET_BY_ID,
  GET_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  SEARCH_GAMES // Asegúrate de importar SEARCH_GAMES
} from "./actionsTypes";

const initialState = {
  videoGames: [],
  searchResults: [], // Nuevo estado para almacenar los resultados de la búsqueda
  game: [],
  gameDetail: [],
  newGame: [],
  nameGame: [],
  filteredGames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, videoGames: action.payload };
    case GET_GENRES:
      return { ...state, game: action.payload };
    case GET_BY_ID:
      return { ...state, gameDetail: action.payload };
    case GET_BY_NAME:
      return { ...state, nameGame: action.payload };
    case FILTER_BY_GENRE:
      const filteredByGenre = state.videoGames.filter((game) => 
        game.genres.includes(action.payload)
      );
      return { ...state, filteredGames: filteredByGenre };
    case FILTER_BY_ORIGIN:
      const filteredByOrigin = state.videoGames.filter(
        (game) => game.origin === action.payload
      );
      return { ...state, filteredGames: filteredByOrigin };
      case SEARCH_GAMES:
        return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
