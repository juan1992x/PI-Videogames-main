import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = ({ id, name, genres, image }) => {
  // console.log(props);
  return (
    <div className={style.Container}>
      <p>Name: {name}</p>
      <Link to={`/detail/${id}`}>
        <img src={image} alt="not found" />
      </Link>
      <p>genres: {genres}</p>
    </div>
  );
};

export default Card;
