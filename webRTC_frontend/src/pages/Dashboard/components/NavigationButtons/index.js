import React from "react";
import { useHistory } from "react-router-dom";

import { FiHome, FiArrowLeftCircle, FiLogOut } from "react-icons/fi";

import "./styles.css";

function NavigationButtons() {
  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  function handleGoHome() {
    history.push("/home");
  }

  function handleLogOut() {
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
