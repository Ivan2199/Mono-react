import React from "react";
import "../style/Button.css";

function Button(props) {
  return (
    <div className="button">
      <button type="submit" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
}

export default Button;
