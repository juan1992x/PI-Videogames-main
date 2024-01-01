import React from 'react';
import styles from "../Paginado/Paginado.module.css"


function Paginado({ juegosPorPagina, totalJuegos, paginar }) {
  const numerosDePagina = [];

  for (let i = 1; i <= Math.ceil(totalJuegos / juegosPorPagina); i++) {
    numerosDePagina.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {numerosDePagina.map(numero => (
          <li key={numero} className={styles.pageItem}>
            <a onClick={() => paginar(numero)} href='#!' className={styles.pageLink}>
              {numero}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Paginado;