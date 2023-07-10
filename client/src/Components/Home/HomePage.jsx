import { useDispatch } from "react-redux";
import CardContainer from "../CardContainer/CardContainer"
import { useEffect } from "react";
import { getVideoGames } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  // que haga el dispatch cuando se monte.
  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  return (
    <div className={style.Container}>
      <h1>Henry video games</h1>
      <CardContainer />
    </div>
  );
};

export default Home;
