import { GET_GENRES, GET_VIDEOGAMES, GET_BY_ID, GET_BY_NAME, FILTER_BY_GENRE, FILTER_BY_ORIGIN } from "./actionsTypes";

const initialState = {
  videoGames: [],
  game: [],
  gameDetail: [],
  newGame: [],
  nameGame: [],
  filteredGames: [], // Nuevo estado para almacenar los juegos filtrados
};

const rootReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_VIDEOGAMES:
      return { ...state, videoGames: actions.payload };
    case GET_GENRES:
      return { ...state, game: actions.payload };
    case GET_BY_ID:
      return { ...state, gameDetail: actions.payload };
    case GET_BY_NAME:
      return { ...state, nameGame: actions.payload };
    case FILTER_BY_GENRE:
      // Filtrar juegos por género
      const genre = actions.payload;
      const filteredByGenre = state.videoGames.filter((game) =>
        game.genres.includes(genre)
      );
      return { ...state, filteredGames: filteredByGenre };
    case FILTER_BY_ORIGIN:
      // Filtrar juegos por origen (API o Database)
      const origin = actions.payload;
      const filteredByOrigin = state.videoGames.filter(
        (game) => game.origin === origin
      );
      return { ...state, filteredGames: filteredByOrigin };
    default:
      return { ...state };
  }
};

export default rootReducer;
