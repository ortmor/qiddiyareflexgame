import React from "react";

import "../Styles/home.scss";
import Home from "./Home";

function Main() {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <Home />
      </div>
    </div>
  );
}

export default Main;
