import React from "react";
import Logo from "../Media/Images/logo.png";
import Homebtn from "../Media/Images/mainhead.png";
import Startbtn from "../Media/Images/start.png";
import bg from "../Media/Images/idle.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/selection");
  };
  return (
    <div className="container-carousel">
      <div className="homelogocontainer">
        <img width="300px" src={Logo} />
        <div className="logohome">
          <img width="400px" src={Homebtn} />
        </div>

        <div className="logohome">
          <img
            width="400px"
            src={Startbtn}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <img id="img" src={bg} />
    </div>
  );
}

export default Home;
