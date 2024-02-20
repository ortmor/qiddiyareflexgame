import React, { useState } from "react";
import "../Styles/selection.scss";
import Selection from "./Selection";

function SelectionMain() {
  return (
    <>
      <div className="selection-container">
        <div className="selection-carousel-container">
          <Selection />
        </div>
      </div>
    </>
  );
}

export default SelectionMain;
