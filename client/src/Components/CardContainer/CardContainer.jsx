import Card from "../Card/Cards";
import styles from "./CardContainer.module.css";
import { useSelector } from "react-redux";

const CardContainer = () => {
  const videogames = useSelector((state) => state.videoGames);
  // console.log(videogames);

  return (
    <div className={styles.Container}>
      {videogames.map((game) => {
        return (
          <Card
            key={game.id}
            id={game.id}
            image={game.image}
            name={game.name}
            genres={game.genres}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
