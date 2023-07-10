import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getById } from "../../redux/actions";

import style from "./Detail.module.css";

const Detail = () => {
  const { detailId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(detailId));
  }, [dispatch, detailId]);

  const gameDetail = useSelector((state) => state.gameDetail);

  return (
    <div className={style.Container}>
      <h1>Detalles</h1>
      <div>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
      <h2>Nombre: {gameDetail.name}</h2>
      <img src={gameDetail.background_image} alt="not found" />
      <h3>Description: {gameDetail.description}</h3>
      <h3>Fecha de lanzamiento: {gameDetail.released}</h3>
      <h3>Rating: {gameDetail.rating}</h3>
    </div>
  );
};

export default Detail;
