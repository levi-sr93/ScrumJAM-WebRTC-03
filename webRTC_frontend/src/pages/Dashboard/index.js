import React, { useEffect } from "react";

import * as webRTCHandler from "../../utils/webRTC/webRTCHandler";

import logo from "../../assets/images/logo.png";
import ActiveUsersItem from "./components/ActiveUsersList";

import "./styles.css";

import DirectCall from "./components/DirectCalls/DirectCall";
import NavigationButtons from "./components/NavigationButtons";

function Dashboard() {
  useEffect(() => {
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section dashboard_background_secondary_color">
        <div className="dashboard_logo_container">
          <img className="dashboard_logo_container" src={logo} alt="" />
        </div>
        <div className="dashboard_active_users_list">
          <h4>Participantes</h4>
          <ActiveUsersItem />
          <NavigationButtons />
        </div>
      </div>
      <div className="dashboard_right_section main_videos_section">
        <div className="dashboard_content_container ">
          <DirectCall />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
