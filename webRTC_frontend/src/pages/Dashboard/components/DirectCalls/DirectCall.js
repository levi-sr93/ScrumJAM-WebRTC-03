import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LocalVideoView from "../LocalVideoView";
import RemoteVideoView from "../RemoteVideoView";
import ConversationButtons from "../ConversationButtons";
import _ from "lodash";

import {
  callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../../../redux/actions/callActions";

import "./styles.css";

function DirectCall() {
  const localStream = useSelector((state) => state.call.localStream);
  const remoteStream = useSelector((state) => state.call.remoteStream);
  const callState = useSelector((state) => state.call.callState);

  const dispatch = useDispatch();

  //Getting from globalState

  const screenSharingActive = useSelector(
    (state) => state.call.screenSharingActive
  );

  // remove duplicates
  let uniqueRemote = _.uniqWith(remoteStream, _.isEqual);

  return (
    <div className="dashboard_call_video_container">
      <LocalVideoView localStream={localStream} />

      {remoteStream &&
        uniqueRemote.map((stream) => (
          <div className="remote_videos_section">
            <RemoteVideoView remoteStream={stream} />
          </div>
        ))}

      {
        <ConversationButtons
          localStream={localStream}
          screenSharingActive={screenSharingActive}
        />
      }
    </div>
  );
}

export default DirectCall;
