// CacheGamer.js

let gameCache = null;

const setGameCache = (games) => {
  gameCache = games;
};

const getGameCache = () => {
  return gameCache;
};

module.exports = {
  setGameCache,
  getGameCache
};
