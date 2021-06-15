import React from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";

import "./styles.css";

import DirectCall from "./components/DirectCalls/DirectCall";
import NavigationButtons from "./components/NavigationButtons";

function Dashboard() {
  const roomId = useSelector((state) => state.call.callMeetingId);

  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section dashboard_background_secondary_color">
        <div className="dashboard_logo_container">
          <img className="dashboard_logo_container" src={logo} alt="" />
        </div>
        <div className="room_info_section">
          <div className="room_id_container">
            <span>Código da sala: </span>
            <div onClick={() => navigator.clipboard.writeText(roomId)}>
              <p>{roomId}</p>
            </div>
            <small>Clique para copiar o código</small>
          </div>
          <NavigationButtons />
        </div>
      </div>

      <div className="dashboard_content_container ">
        <DirectCall />
      </div>
    </div>
  );
}

export default Dashboard;
