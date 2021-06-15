import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { setCallMeetingId } from "../../redux/actions/callActions";
import { registerNewUser } from "../../utils/websocket/websocketConnection";

import "./styles.css";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  // const username = useSelector((state) => state.dashboard.username);

  function handleCreateRoom() {
    let roomIdNumber = uuidv4();
    dispatch(setCallMeetingId(roomIdNumber));
    registerNewUser(roomIdNumber);
    history.push("/dashboard");
  }

  function handleEnterExistingRoom() {
    history.push("/enter-room");
  }

  return (
    <div className="home_container background_main_color">
      <div className="home_button">
        <button onClick={handleCreateRoom}>Criar Sala</button>
      </div>

      <div className="home_button">
        <button onClick={handleEnterExistingRoom}>Entrar em uma sala</button>
      </div>
    </div>
  );
}

export default Home;
