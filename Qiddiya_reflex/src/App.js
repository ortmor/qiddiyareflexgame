import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import SelectionMain from "./Components/SelectionMain";

import { useIdleTimer } from "react-idle-timer";

function App() {
  const timeout = 180000;
  const [isIdle, setIsIdle] = useState(false);
  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);
  const {} = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    setInterval(() => {
      if (isIdle === true) {
        window.location.assign("/");
        localStorage.clear();
        sessionStorage.clear();
      }
    }, 0);
  }, [isIdle]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/selection" element={<SelectionMain />} />
      </Routes>
    </Fragment>
  );
}

export default App;
