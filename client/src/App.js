// import "./App.css";
import React from 'react';
import "./globalcss/global.css"
import { Route } from "react-router-dom";

import Landing from "./view/LANDING/Landingpage"
import Home from "./view/Home/HomePage"
import Detail from "./Components/Detail/detail"
import Form from "./Components/Form/Form"
import NavBar from "./view/NavBar/NavBar"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/form">
        <Form />
      </Route>
      <Route path="/detail/:detailId">
        <Detail />
      </Route>
    </div>
  );
}

export default App;