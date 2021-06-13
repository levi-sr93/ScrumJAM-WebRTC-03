import React from "react";

function SubmitButton({ handleSubmit }) {
  return (
    <div className="login-page_button_contaner">
      <button
        className="login-page_button background_main_color text_main_color"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default SubmitButton;
