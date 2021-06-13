import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LocalVideoView from "../LocalVideoView";
import RejectedDialog from "../RejectedDialog";
import RemoteVideoView from "../RemoteVideoView";
import IncomingCallDialog from "../IncomingCallDialog";
import CallingDialog from "../CallingDialog";
import ConversationButtons from "../ConversationButtons";

import {
  callStates,
  setCallRejected,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../../../redux/actions/callActions";

function DirectCall() {
  const localStream = useSelector((state) => state.call.localStream);
  const remoteStream = useSelector((state) => state.call.remoteStream);
  const callState = useSelector((state) => state.call.callState);
  const callerUsername = useSelector((state) => state.call.callerUsername);
  const callRejected = useSelector((state) => state.call.callRejected);
  const localMicrophoneEnabled = useSelector(
    (state) => state.call.localMicrophoneEnabled
  );
  const localCameraEnabled = useSelector(
    (state) => state.call.localCameraEnabled
  );

  const dispatch = useDispatch();

  const hideCallRejectedDialog = (callRejectedDetails) => {
    dispatch(setCallRejected(callRejectedDetails));
  };

  const setCameraEnabled = (enabled) => {
    dispatch(setLocalCameraEnabled(enabled));
  };

  const setMicrophoneEnabled = (enabled) => {
    dispatch(setLocalMicrophoneEnabled(enabled));
  };

  //Getting from globalState
  const callingDialogVisible = useSelector(
    (state) => state.call.callingDialogVisible
  );

  const screenSharingActive = useSelector(
    (state) => state.call.screenSharingActive
  );

  return (
    <div style={{ width: "100%", padding: "40px" }}>
      <LocalVideoView localStream={localStream} />

      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}

      {callingDialogVisible && <CallingDialog />}
      {callRejected.rejected && (
        <RejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationButtons
          localStream={localStream}
          localMicrophoneEnabled={localMicrophoneEnabled}
          setMicrophoneEnabled={setMicrophoneEnabled}
          localCameraEnabled={localCameraEnabled}
          setCameraEnabled={setCameraEnabled}
          screenSharingActive={screenSharingActive}
        />
      )}
    </div>
  );
}

export default DirectCall;
