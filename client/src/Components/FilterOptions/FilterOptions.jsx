import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterByOrigin } from "../../redux/actions";
import style from "./FilterOptions.module.css";

const FilterOptions = () => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const handleFilterByGenre = (genre) => {
    dispatch(filterByGenre(genre));
  };

  const handleFilterByOrigin = (origin) => {
    dispatch(filterByOrigin(origin));
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={style.Container}>
      <button onClick={toggleOptions} className={style.FilterButton}>
        Filtros
      </button>
      {showOptions && (
        <div className={style.Options}>
          <button onClick={() => handleFilterByGenre("Action")}>
            Género: Acción
          </button>
          <button onClick={() => handleFilterByGenre("Adventure")}>
            Género: Aventura
          </button>
          <button onClick={() => handleFilterByGenre("RPG")}>
            Género: RPG
          </button>
          <button onClick={() => handleFilterByOrigin("API")}>
            Origen: API
          </button>
          <button onClick={() => handleFilterByOrigin("Database")}>
            Origen: Base de datos
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
