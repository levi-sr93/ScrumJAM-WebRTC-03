import React from "react";
import "./styles.css";

function ConversationButton({ onClickHandler, children }) {
  return (
    <button className="video-button" onClick={onClickHandler}>
      {children}
    </button>
  );
}

export default ConversationButton;
