import React, { useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCallMeetingId } from "../../redux/actions/callActions";
import { registerNewUser } from "../../utils/websocket/websocketConnection";

import "./styles.css";

function EnterExistingRoom() {
  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.dashboard.username);

  const [roomIdNumber, setRoomIdNumber] = useState("");

  function handleGetIntoRoom(e) {
    e.preventDefault();
    if (roomIdNumber.length == 0) {
      alert("Por favor insira o código da sala");
    } else {
      dispatch(setCallMeetingId(roomIdNumber));
      registerNewUser(roomIdNumber);
      history.push("/dashboard");
    }
  }

  return (
    <div className="enter_room_container background_main_color">
      <span className="enter_room_title">Por favor, insira o ID da sala</span>
      <input
        className="input_create_room"
        type="text"
        name="roomId"
        id="roomId"
        placeholder="cole aqui o id da sala"
        value={roomIdNumber}
        onChange={(e) => setRoomIdNumber(e.target.value)}
      />

      <button
        className="enter_room_button"
        onClick={(e) => handleGetIntoRoom(e)}
      >
        Entrar na Sala
      </button>
      <div className="go_back_button" onClick={() => history.goBack()}>
        <BiLeftArrowCircle color="#FFF" size={32} />
        <p>Voltar</p>
      </div>
    </div>
  );
}

export default EnterExistingRoom;
