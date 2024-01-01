import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = ({ id, name, genres, image }) => {
  const genresText = genres ? genres.map(genre => genre.name).join(', ') : 'No genres available';

  return (
    <div className={style.Container}>
      <p>Name: {name}</p>
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <p>Genres: {genresText}</p>
    </div>
  );
};

export default Card;
