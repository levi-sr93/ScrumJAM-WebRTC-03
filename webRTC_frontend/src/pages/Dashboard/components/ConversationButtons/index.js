import React from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdVideoCall,
  MdCamera,
} from "react-icons/md";
import {
  switchScreenSharingStream,
  hangUp,
} from "../../../../utils/webRTC/webRTCHandler";

import ConversationButton from "./ConversationButton";

import "./styles.css";

function ConversationButtons({
  localStream,
  localCameraEnabled,
  localMicrophoneEnabled,
  setCameraEnabled,
  setMicrophoneEnabled,
  screenSharingActive,
}) {
  const handleMicrophoneButtonPressed = () => {
    const microphoneEnabled = localMicrophoneEnabled;

    localStream.getAudioTracks()[0].enabled = !microphoneEnabled;
    setMicrophoneEnabled(!microphoneEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;

    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };
  return (
    <div className="conversation-buttons-container">
      <ConversationButton onClickHandler={handleMicrophoneButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic className="conversation-buttons-icon" color="#fff" />
        ) : (
          <MdMicOff className="conversation-buttons-icon" />
        )}
      </ConversationButton>
      <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd className="conversation-buttons-icon" color="#fff" />
      </ConversationButton>
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam className="conversation-buttons-icon" color="#fff" />
        ) : (
          <MdVideocamOff className="conversation-buttons-icon" color="#fff" />
        )}
      </ConversationButton>
      <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? (
          <MdCamera className="conversation-buttons-icon" color="#fff" />
        ) : (
          <MdVideoLabel className="conversation-buttons-icon" color="#fff" />
        )}
      </ConversationButton>
    </div>
  );
}

export default ConversationButtons;
