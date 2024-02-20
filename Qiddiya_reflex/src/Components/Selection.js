import React, { useState, useEffect, useRef } from "react";
import bg from "../Media/Images/main.png";
import Logo from "../Media/Images/logo.png";
import timer from "../Media/Images/timer.png";
import reset from "../Media/Images/reset.png";
import { useNavigate } from "react-router-dom";

function Selection() {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [lightsVisible, setLightsVisible] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isRaceEnded, setIsRaceEnded] = useState(false);
  const [showJumpMessage, setShowJumpMessage] = useState(false);

  const resetLights = () => {
    localStorage.removeItem("counter");
    navigate("/");
  };

  useEffect(() => {
    const handleLightAnimation = () => {
      const lightContainers = document.querySelectorAll(".lightcontainer");
      let index = 0;
      const counterElement = document.querySelector("h5");

      const handleJumpToStart = (event) => {
        if (
          (event.type === "mousedown" ||
            (event.type === "keydown" && event.key === " ")) &&
          index < lightContainers.length
        ) {
          setShowJumpMessage(true);
          document.removeEventListener("mousedown", handleJumpToStart);
          document.removeEventListener("keydown", handleJumpToStart);
          setCounter(0);

          // event.preventDefault()

          setTimeout(() => {
            setShowJumpMessage(false);
            window.location.reload();
          }, 1000);
        }
      };

      const lightUpNext = () => {
        if (index < lightContainers.length) {
          lightContainers[index].style.backgroundColor = "red";
          if (index + 1 < lightContainers.length) {
            lightContainers[index + 1].style.backgroundColor = "red";
          }
          index += 2;
          setTimeout(lightUpNext, 2000);
          document.addEventListener("mousedown", handleJumpToStart);
          document.addEventListener("keydown", handleJumpToStart);
        } else {
          lightContainers.forEach((container) => {
            container.style.backgroundColor = "#363434";
          });
          setStartTime(new Date());
        }
      };
      setTimeout(() => {
        setIsRaceEnded(true);
        lightUpNext();
      }, 1000);
    };

    if (lightsVisible) {
      handleLightAnimation();
    }
  }, [lightsVisible]);

  useEffect(() => {
    const calculateElapsedTime = () => {
      if (startTime && isRaceEnded) {
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 1000;
        setCounter(elapsedTime);
        localStorage.setItem("counter", JSON.stringify(elapsedTime));
      }
    };

    const intervalId = setInterval(calculateElapsedTime, 100);

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    const storedCounter = localStorage.getItem("counter");
    if (storedCounter) {
      setCounter(JSON.parse(storedCounter));
    }
  }, []);

  //reset light
  const animationTimeoutRef = useRef(null);
  const resetLightsinwindow = (event) => {
    if (!lightsVisible) {
      setLightsVisible(true);
      setIsTimerRunning(true);
      setCounter(0);
      localStorage.removeItem("counter");
    } else {
      setLightsVisible(false);
      setIsTimerRunning(false);
      if (event) {
        const isMouseClick = event.type === "click";
        const isSpaceKey = event.type === "keydown" && event.key === " ";
        if (isMouseClick || isSpaceKey) {
          setStartTime(null);
          animationTimeoutRef.current = setTimeout(() => {
            setLightsVisible(true);
            setIsTimerRunning(true);
            setCounter(0);
            localStorage.removeItem("counter");
          }, 50000);
        }
      }
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        resetLightsinwindow(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  return (
    <div className="selection-carousel">
      <div className="selectionmaincontainer">
        <div className="selectionlogocontainer">
          <br />
          <br />
          <img width="200px" src={Logo} />
          <div onClick={resetLightsinwindow} className="logoselection">
            <img width="500px" src={timer} />
            <div className="light">
              <div className="lightcontainer"></div>
              <div className="lightcontainer"></div>
            </div>

            <div className="lighttwo">
              <div className="lightcontainer"></div>
              <div className="lightcontainer"></div>
              <div className="lightthree">
                <div className="lightcontainer"></div>
                <div className="lightcontainer"></div>
              </div>
              <div className="lightfour">
                <div className="lightcontainer"></div>
                <div className="lightcontainer"></div>
              </div>
              <div className="lightfive">
                <div className="lightcontainer"></div>
                <div className="lightcontainer"></div>
              </div>
            </div>
          </div>

          <div className="centerfontmain">
            {isTimerRunning ? (
              <p>
                When you're ready to race, then press the button
                <br />
                again when the lights go out.
              </p>
            ) : (
              <div className="centerfontmainchildone">
                <h6>
                  {counter === 0.0
                    ? null
                    : counter > 0.0 && counter < 1
                    ? "Excellent"
                    : counter >= 1 && counter < 2
                    ? "Very Good"
                    : counter >= 2 && counter < 3
                    ? "Good"
                    : "Need Improvement"}
                </h6>
              </div>
            )}
            <div className="centerfontmainchildtwo">
              {!showJumpMessage && <h5>{counter.toFixed(3)}</h5>}
              {showJumpMessage && <h5>Jump to start!</h5>}
            </div>
          </div>

          <div className="footerselection">
            <img
              width="100px"
              src={reset}
              onClick={resetLights}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <img id="img" src={bg} />
      </div>
    </div>
  );
}

export default Selection;
