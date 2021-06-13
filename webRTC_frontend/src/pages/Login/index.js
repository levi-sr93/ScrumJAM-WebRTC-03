import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as dashboardActions from "../../redux/actions/dashboardActions";

import { registerNewUser } from "../../utils/websocket/websocketConnection";

import logo from "../../assets/images/logo.png";
import UsernameInput from "./components/UsernameInput";
import SubmitButton from "./components/SubmitButton";

import "./styles.css";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  function handleSubmit() {
    dispatch(dashboardActions.setUsername(username));
    registerNewUser(username);
    history.push("/dashboard");
  }

  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img src={logo} alt="ScrumJam" className="login-page_logo_image" />
        </div>

        <div className="login_page title_container">
          <h2>Entrar na sala</h2>
        </div>

        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;
