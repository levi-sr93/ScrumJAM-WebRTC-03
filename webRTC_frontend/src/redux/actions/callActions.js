export const CALL_SET_MEETING_ID = "CALL_SET_MEETING_ID";
export const CALL_SET_LOCAL_STREAM = "CALL_SET_LOCAL_STREAM";
export const CALL_SET_CALL_STATE = "CALL_SET_CALL_STATE";
export const SET_CALL_CALLING_DIALOG_VISIBLE =
  "SET_CALL_CALLING_DIALOG_VISIBLE";
export const CALL_SET_CALLER_USERNAME = "CALL_SET_CALLER_USERNAME";
export const CALL_SET_CALL_REJECTED = "CALL_SET_CALL_REJECTED";
export const CALL_SET_REMOTE_STREAM = "CALL_SET_REMOTE_STREAM";
export const CALL_SET_LOCAL_MICROPHONE_ENABLED =
  "CALL_SET_LOCAL_MICROPHONE_ENABLED";
export const CALL_SET_LOCAL_CAMERA_ENABLED = "CALL_SET_LOCAL_CAMERA_ENABLED";
export const CALL_SET_SCREEN_SHARING_ACTIVE = "CALL_SET_SCREEN_SHARING_ACTIVE";
export const CALL_RESET_CALL_DATA = "CALL_RESET_CALL_DATA";

export const callStates = {
  CALL_UNAVAILABLE: "CALL_UNAVAILABLE",
  CALL_AVAILABLE: "CALL_AVAILABLE",
  CALL_REQUESTED: "CALL_REQUESTED",
  CALL_IN_PROGRESS: "CALL_IN_PROGRESS",
};

export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    payload: localStream,
  };
};

export const setCallState = (callState) => {
  return {
    type: CALL_SET_CALL_STATE,
    payload: callState,
  };
};

export const setCallingDialogVisible = (visible) => {
  return {
    type: SET_CALL_CALLING_DIALOG_VISIBLE,
    payload: visible,
  };
};

export const setCallerUsername = (callerUsername) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    payload: callerUsername,
  };
};

export const setCallRejected = (callRejectedDetails) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    payload: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason,
    },
  };
};

export const setRemoteStream = (peerConn, remoteStream) => {
  return {
    type: CALL_SET_REMOTE_STREAM,
    payload: remoteStream,
  };
};

export const setLocalMicrophoneEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_MICROPHONE_ENABLED,
    payload: enabled,
  };
};

export const setLocalCameraEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_CAMERA_ENABLED,
    payload: enabled,
  };
};

export const setScreenSharingActive = (active) => {
  return {
    type: CALL_SET_SCREEN_SHARING_ACTIVE,
    payload: active,
  };
};

export const resetCallDataState = () => {
  return {
    type: CALL_RESET_CALL_DATA,
  };
};

export const setCallMeetingId = (meetingId) => {
  return {
    type: CALL_SET_MEETING_ID,
    payload: meetingId,
  };
};
