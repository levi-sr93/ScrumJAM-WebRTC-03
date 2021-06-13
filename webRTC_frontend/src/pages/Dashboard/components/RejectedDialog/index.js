import React, { useEffect } from "react";
import "./styles.css";

function RejectedDialog({ reason, hideCallRejectedDialog }) {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: "",
      });
    }, 4000);
  }, [hideCallRejectedDialog]);
  return (
    <div class="call_rejected_dialog background_dialog_color">
      <span>{reason}</span>
    </div>
  );
}

export default RejectedDialog;
