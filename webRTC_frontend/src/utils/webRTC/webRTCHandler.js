import store from "../../redux/store";
import * as callActions from "../../redux/actions/callActions";
import * as websocket from "../websocket/websocketConnection";

const preOfferAnswers = {
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
};

const defaultConstrains = {
  video: true,
  audio: true,
};

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:13902",
    },
  ],
};

let connectedUserSocketId;
let peerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(callActions.setLocalStream(stream));
      store.dispatch(
        callActions.setCallState(callActions.callStates.CALL_AVAILABLE)
      );
      createPeerConnection();
    })
    .catch((error) => {
      console.log(`Error: ${error}. Could not get access to local stream`);
    });
};

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  console.log("Peer Connection OBJ", peerConnection);

  const localStream = store.getState().call.localStream;

  //adding tracks to peerConnection
  for (let track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(callActions.setRemoteStream(stream));
  };

  peerConnection.onicecandidate = (event) => {
    console.log("Getting candidates from STUN server", event);
    if (event.candidate) {
      websocket.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId,
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    console.log("Valor do PeerConnection", peerConnection);
    if (peerConnection.connectionState === "connected") {
      console.log("Successfully connected with other peer");
    }
  };
};

export const callToOtherUsers = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(
    callActions.setCallState(callActions.callStates.CALL_IN_PROGRESS)
  );
  store.dispatch(callActions.setCallingDialogVisible(true));
  //sending the Pre-offer
  websocket.sendPreOffer({
    callee: calleeDetails,
    caller: { username: store.getState().dashboard.username },
  });
};

export const handlePreOffer = (data) => {
  store.dispatch(callActions.setCallingDialogVisible(false));

  if (checkIfCallIsPossible) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(callActions.setCallerUsername(data.callerUsername));
    store.dispatch(
      callActions.setCallState(callActions.callStates.CALL_REQUESTED)
    );
  } else {
    websocket.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

export const acceptIncommingCallRequest = () => {
  websocket.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });

  store.dispatch(
    callActions.setCallState(callActions.callStates.CALL_IN_PROGRESS)
  );
};

export const rejectIncommingCallRequest = () => {
  websocket.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });

  resetCallData();
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(callActions.setCallingDialogVisible(false));
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = "Contato não pode responder esse chamado agora";
    } else {
      rejectionReason = "Chamado foi cancelado/rejeitado pelo usuário";
    }
    store.dispatch(
      callActions.setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    );

    resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();

  //set local description of peer connection caller side
  await peerConnection.setLocalDescription(offer);

  //sending offer to other user
  websocket.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer,
  });
};

//exchange SDP - Local and Remote description
export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer(); //this method creates an SDP answer to offer received from remote peer
  await peerConnection.setLocalDescription(answer);

  websocket.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer,
  });
};

export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data) => {
  try {
    console.log("adding ICE candidate");
    await peerConnection.addIceCandidate(data.candidate);
  } catch (error) {
    console.error("Error while trying to add received ICE candidate", error);
  }
};

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callActions.callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

let screenSharingStream;
export const switchScreenSharingStream = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      store.dispatch(callActions.setScreenSharingActive(true));

      //replacing the video tracking
      const senders = peerConnection.getSenders();
      const sender = senders.find(
        (sender) =>
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
      );

      //showing video from screen
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (error) {
      console.log("Error to share the screen", error);
    }
  } else {
    //switching back to camera
    const localStream = store.getState().call.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(
      (sender) => sender.track.kind === localStream.getVideoTracks()[0].kind
    );

    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(callActions.setScreenSharingActive(false));

    //stopping the screenSharingStream given to the browser
    screenSharingStream.getTracks().forEach((track) => track.stop());
  }
};

export const handleUserHangledUp = () => {
  resetCallDataAfterHangUp();
};

export const hangUp = () => {
  websocket.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
  });

  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = () => {
  //stopping screen sharing if it is on
  if (store.getState().call.screenSharingActive) {
    screenSharingStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  //reseting all data after hangup. So will be able to do other call.
  store.dispatch(callActions.resetCallDataState());

  //closing peer connection
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(
    callActions.setCallState(callActions.callStates.CALL_AVAILABLE)
  );
};
