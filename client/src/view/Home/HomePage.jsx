import React, { useState, useEffect } from 'react';
import CardContainer from '../../Components/CardContainer/CardContainer';
import Paginado from "../../Components/Paginado/Paginado";
import { useDispatch } from 'react-redux';
import { getVideoGames } from '../../redux/actions';
import style from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const juegosPorPagina = 15;

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  const paginar = (numeroDePagina) => setPaginaActual(numeroDePagina);

  return (
    <div className={style.Container}>
      <h1>Henry video games</h1>
      <CardContainer paginaActual={paginaActual} juegosPorPagina={juegosPorPagina} />
      <Paginado juegosPorPagina={juegosPorPagina} totalJuegos={100} paginar={paginar} />
    </div>
  );
};

export default Home;
