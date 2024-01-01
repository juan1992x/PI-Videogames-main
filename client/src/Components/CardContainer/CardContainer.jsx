import Card from "../Card/Cards";
import styles from "./CardContainer.module.css";
import { useSelector } from "react-redux";

const CardContainer = ({ paginaActual, juegosPorPagina }) => {
  const { videoGames, filteredGames, searchResults } = useSelector((state) => state);

  let juegosParaMostrar;
  if (searchResults && searchResults.length > 0) {
    juegosParaMostrar = searchResults;
  } else if (filteredGames && filteredGames.length > 0) {
    juegosParaMostrar = filteredGames;
  } else {
    juegosParaMostrar = videoGames;
  }

  // Añadido para depuración: Imprime en consola los juegos que se van a mostrar
  console.log("Juegos para mostrar:", juegosParaMostrar);

  const indiceUltimoJuego = paginaActual * juegosPorPagina;
  const indicePrimerJuego = indiceUltimoJuego - juegosPorPagina;
  const juegosActuales = juegosParaMostrar.slice(indicePrimerJuego, indiceUltimoJuego);

  return (
    <div className={styles.Container}>
      {juegosActuales.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          image={game.background_image}
          name={game.name}
          genres={game.genres}
        />
      ))}
    </div>
  );
};

export default CardContainer;
