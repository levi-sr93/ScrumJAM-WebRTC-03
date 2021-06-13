import * as callActions from "../actions/callActions";

const initialState = {
  localStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.payload,
      };
    case callActions.SET_CALL_CALLING_DIALOG_VISIBLE:
      return {
        ...state,
        callingDialogVisible: action.payload,
      };
    case callActions.CALL_SET_CALLER_USERNAME:
      return {
        ...state,
        callerUsername: action.payload,
      };
    case callActions.CALL_SET_CALL_REJECTED:
      return {
        ...state,
        callRejected: action.payload,
      };
    case callActions.CALL_SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload,
      };
    case callActions.CALL_SET_LOCAL_MICROPHONE_ENABLED:
      return {
        ...state,
        localMicrophoneEnabled: action.payload,
      };
    case callActions.CALL_SET_LOCAL_CAMERA_ENABLED:
      return {
        ...state,
        localCameraEnabled: action.payload,
      };
    case callActions.CALL_SET_SCREEN_SHARING_ACTIVE:
      return {
        ...state,
        screenSharingActive: action.payload,
      };
    case callActions.CALL_RESET_CALL_DATA:
      return {
        ...state,
        remoteStream: null,
        screenSharingActive: false,
        callerUsername: "",
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
        callingDialogVisible: false,
      };
    default:
      return state;
  }
};
