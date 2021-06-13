import React from "react";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import "./styles.css";

import {
  acceptIncommingCallRequest,
  rejectIncommingCallRequest,
} from "../../../../utils/webRTC/webRTCHandler";

function IncomingCallDialog({ callerUsername }) {
  const handleAcceptButton = () => {
    acceptIncommingCallRequest();
  };

  const handleRejectButton = () => {
    rejectIncommingCallRequest();
  };

  return (
    <div className="direct_call_dialog background_dialog_color">
      <span className="direct_call_dialog_caller_name">{callerUsername}</span>
      <p>chamando...</p>

      <div className="direct_call_dialog_buttons_section">
        <button
          className="direct_call_dialog_accept_button"
          onClick={handleAcceptButton}
        >
          <AiFillCheckCircle color="green" size={32} />
        </button>
        <button
          className="direct_call_dialog_reject_button"
          onClick={handleRejectButton}
        >
          <AiFillCloseCircle color="#FF5733" size={32} />
        </button>
      </div>
    </div>
  );
}

export default IncomingCallDialog;
