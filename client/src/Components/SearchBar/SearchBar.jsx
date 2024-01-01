// En SearchBar.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGames } from "../../redux/actions"; // Importa la acción searchGames
import style from "./SearchBar.module.css";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = () => {
    if (search) {
      dispatch(searchGames(search));
    }
  };

  return (
    <div className={style.Container}>
      <input
        type="search"
        placeholder="Search Name or ID"
        value={search}
        onChange={handleInputChange}
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
};
