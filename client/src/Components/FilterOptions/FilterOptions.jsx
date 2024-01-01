import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  filterByGenre,
  filterByOrigin,
  sortBy,
  resetFilters,
  deleteCreatedGames,
  getVideoGames
} from '../../redux/actions';
import style from './FilterOptions.module.css';

const FilterOptions = () => {
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedSort, setSelectedSort] = useState('');


  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    dispatch(filterByGenre(event.target.value));
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
    if (event.target.value === '') {
      dispatch(getVideoGames()); // Vuelve a cargar todos los juegos si la selección es vacía
    } else {
      dispatch(filterByOrigin(event.target.value));
    }
  };
  
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    const [type, order] = event.target.value.split("-");
    dispatch(sortBy(type, order));
  };

  const handleReset = () => {
    const confirmDelete = window.confirm('¿Quieres borrar los juegos creados que se almacenan en la base de datos?');
  
    if (confirmDelete) {
      // Si el usuario confirma, elimina los juegos y restablece los filtros
      dispatch(deleteCreatedGames());
      setSelectedGenre('');
      setSelectedOrigin('');
      setSelectedSort('');
      dispatch(resetFilters());
    } else {
      // Si el usuario cancela, solo restablece los filtros
      setSelectedGenre('');
      setSelectedOrigin('');
      setSelectedSort('');
      dispatch(resetFilters());
    }
  };
  return (
    <div className={style.Container}>
      {/* Lista desplegable para géneros */}
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Filtrar por Género</option>
        <option value="Action">Acción</option>
        <option value="Indie">Aventura</option>
        <option value="Adventure">Adventure</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Strategy</option>
        <option value="Shooter">Shooter</option>
        <option value="Casual">Casual</option>
        <option value="Simulation">Simulation</option>
        <option value="Arcade">Arcade</option>
        <option value="Platformer">Platformer</option>
        <option value="Massively Multiplayer">Massively Multiplayer</option>
        <option value="Racing">Racing</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Family">Family</option>
        <option value="Board Games">Board Games</option>
        <option value="Educational">Educational</option>
        <option value="Card">Card</option>
        </select>

      {/* Lista desplegable para origen */}
      <select value={selectedOrigin} onChange={handleOriginChange}>
        <option value="">Filtrar por Origen</option>
        <option value="API">API</option>
        <option value="Database">Base de datos</option>
      </select>


      {/* Lista desplegable para ordenar */}
      <select value={selectedSort} onChange={handleSortChange}>
        <option value="">Ordenar por</option>
        <option value="name-asc">Nombre Ascendente</option>
        <option value="name-desc">Nombre Descendente</option>
        <option value="rating-asc">Rating Ascendente</option>
        <option value="rating-desc">Rating Descendente</option>
      </select>

      {/* Botón para resetear filtros */}
      <button onClick={handleReset}>resetear y eliminar</button>
    </div>
  );
};

export default FilterOptions; 
