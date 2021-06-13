import React from "react";
import { useHistory } from "react-router-dom";

import { FiHome, FiArrowLeftCircle, FiLogOut } from "react-icons/fi";

import "./styles.css";
import { hangUp } from "../../../../utils/webRTC/webRTCHandler";

function NavigationButtons() {
  const history = useHistory();

  function handleGoBack() {
    hangUp();
    history.goBack();
  }

  function handleGoHome() {
    hangUp();
    history.push("/home");
  }

  function handleLogOut() {
    hangUp();
    history.push("/");
  }

  return (
    <div className="buttons_section">
      <button className="buttons_background" onClick={handleGoBack}>
        <FiArrowLeftCircle size={30} color="#fff" />
        Voltar
      </button>
      <button className="buttons_background" onClick={handleGoHome}>
        <FiHome size={30} color="#fff" />
        Home
      </button>
      <button className="buttons_background" onClick={handleLogOut}>
        <FiLogOut size={30} color="#fff" />
        Sair
      </button>
    </div>
  );
}

export default NavigationButtons;
