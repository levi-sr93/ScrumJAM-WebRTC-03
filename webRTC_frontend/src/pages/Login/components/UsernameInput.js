import React from "react";
import "../styles.css";

function UsernameInput(props) {
  const { username, setUsername } = props;
  return (
    <div className="login-page_input_container">
      <input
        className="login-page_input background_main_color text_main_container"
        type="text"
        placeholder="Nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}

export default UsernameInput;
