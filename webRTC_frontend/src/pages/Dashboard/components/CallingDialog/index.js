import React from "react";
import { MdCallEnd } from "react-icons/md";
import { hangUp } from "../../../../utils/webRTC/webRTCHandler";
import "./styles.css";

function CallingDialog() {
  const handleHangUpButtonPressed = () => {
    hangUp();
  };
  return (
    <div className=".direct_call_dialog background_calling_dialog">
      <span>Chamando...</span>

      <div
        className="direct_call_dialog_button_container"
        onClick={handleHangUpButtonPressed}
      >
        <MdCallEnd style={{ width: "35px", height: "35px", fill: "#FF5733" }} />
      </div>
    </div>
  );
}

export default CallingDialog;
