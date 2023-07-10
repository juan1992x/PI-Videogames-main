import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import FilterOptions from "../FilterOptions/FilterOptions"; // Importar el componente FilterOptions

const NavBar = () => {
  return (
    <div className={style.Container}>
      <Link to="/home" className={style.Link}>
        HOME
      </Link>
      <Link to="/form" className={style.Link}>
        FORM
      </Link>
      <Link to="/" className={style.Link}>
        Landing
      </Link>
      <SearchBar />
      <FilterOptions /> {/* Agregar el componente FilterOptions */}
    </div>
  );
};

export default NavBar;

