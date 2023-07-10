import { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getByName } from "../../redux/actions"
import style from "./SearchBar.module.css";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  // const params = useParams();
  const dispatch = useDispatch();
  // console.log(params);
  const handleinputChange = (event) => {
    const { value } = event.target;
    // console.log(value);
    setSearch(value);
  };

  useEffect(() => {
    dispatch(getByName(search));
  }, [dispatch, search]);

  const nameOfGame = useSelector((state) => state.nameGame);
  console.log(nameOfGame);

  const onSearch = () => {
    setSearch(nameOfGame);
  };
  return (
    <div className={style.Container}>
      <div>
        <input
          type="search"
          placeholder="Search Name"
          onChange={handleinputChange}
        />
      </div>
      <button
        onClick={() => {
          onSearch(search);
        }}
      >
        Buscar
      </button>
    </div>
  );
};
