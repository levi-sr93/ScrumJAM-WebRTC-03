import store from "../../redux/store";
import * as callActions from "../../redux/actions/callActions";
import * as websocket from "../websocket/websocketConnection";

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
let peerConnection = [];

export const getLocalStream = (peerConn, sendOffer) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(callActions.setLocalStream(stream));
      store.dispatch(
        callActions.setCallState(callActions.callStates.CALL_AVAILABLE)
      );
      createPeerConnection(peerConn, sendOffer);
    })
    .catch((error) => {
      alert("Por favor, tenha uma camera e um microfone para participar");
      console.log(`Error: ${error}. Could not get access to local stream`);
    });
};

const createPeerConnection = (peerConn, sendOffer) => {
  // peerConnection.push(peerConn);
  peerConnection[peerConn] = new RTCPeerConnection(configuration);
  console.log("Peer Connection OBJ", peerConnection);

  const localStream = store.getState().call.localStream;

  //adding tracks to peerConnection
  for (let track of localStream.getTracks()) {
    peerConnection[peerConn].addTrack(track, localStream);
  }

  peerConnection[peerConn].ontrack = ({ streams: [stream] }) => {
    store.dispatch(callActions.setRemoteStream(peerConn, stream));
  };

  peerConnection[peerConn].onicecandidate = (event) => {
    console.log("Getting candidates from STUN server", event);
    if (event.candidate) {
      websocket.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: peerConn,
      });
    }
  };

  peerConnection[peerConn].onconnectionstatechange = (event) => {
    console.log("Valor do PeerConnection", peerConnection);
    if (peerConnection[peerConn].connectionState === "connected") {
      console.log("Successfully connected with other peer");
    }
  };
  const sendWebRTCOffer = async (peerConn) => {
    peerConnection[peerConn].onnegotiationneeded = async () => {
      let offer = await peerConnection[peerConn].createOffer();

      await peerConnection[peerConn].setLocalDescription(offer);

      websocket.sendWebRTCOffer({
        calleeSocketId: peerConn,
        offer: offer,
      });
    };
  };

  if (sendOffer) {
    sendWebRTCOffer(peerConn);
  }
};

//exchange SDP - Local and Remote description
export const handleOffer = async (data) => {
  await peerConnection[data.user].setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection[data.user].createAnswer(); //this method creates an SDP answer to offer received user remote peer
  await peerConnection[data.user].setLocalDescription(
    new RTCSessionDescription(answer)
  );

  websocket.sendWebRTCAnswer({
    callerSocketId: data.user,
    answer: answer,
  });
};

export const handleAnswer = async (data) => {
  await peerConnection[data.user].setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );
};

export const handleCandidate = async (data) => {
  try {
    console.log("adding ICE candidate");
    await peerConnection[data.user].addIceCandidate(
      new RTCIceCandidate(data.candidate)
    );
  } catch (error) {
    console.error("Error while trying to add received ICE candidate", error);
  }
};

// let screenSharingStream;
// export const switchScreenSharingStream = async () => {
//   if (!store.getState().call.screenSharingActive) {
//     try {
//       screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//       });

//       store.dispatch(callActions.setScreenSharingActive(true));

//       //replacing the video tracking
//       const senders = peerConnection.getSenders();
//       const sender = senders.find(
//         (sender) =>
//           sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
//       );

//       //showing video from screen
//       sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
//     } catch (error) {
//       console.log("Error to share the screen", error);
//     }
//   } else {
//     //switching back to camera
//     const localStream = store.getState().call.localStream;
//     const senders = peerConnection.getSenders();
//     const sender = senders.find(
//       (sender) => sender.track.kind === localStream.getVideoTracks()[0].kind
//     );

//     sender.replaceTrack(localStream.getVideoTracks()[0]);
//     store.dispatch(callActions.setScreenSharingActive(false));

//     //stopping the screenSharingStream given to the browser
//     screenSharingStream.getTracks().forEach((track) => track.stop());
//   }
// };

// export const handleUserHangledUp = () => {
//   resetCallDataAfterHangUp();
// };

// export const hangUp = () => {
//   websocket.sendUserHangedUp({
//     connectedUserSocketId: connectedUserSocketId,
//   });

//   resetCallDataAfterHangUp();
// };

// const resetCallDataAfterHangUp = () => {
//   //stopping screen sharing if it is on
//   if (store.getState().call.screenSharingActive) {
//     screenSharingStream.getTracks().forEach((track) => {
//       track.stop();
//     });
//   }

//   //reseting all data after hangup. So will be able to do other call.
//   store.dispatch(callActions.resetCallDataState());

//   //closing peer connection
//   peerConnection.close();
//   peerConnection = null;
//   createPeerConnection();
//   resetCallData();

//   const localStream = store.getState().call.localStream;
//   localStream.getVideoTracks()[0].enabled = true;
//   localStream.getAudioTracks()[0].enabled = true;
// };

// export const resetCallData = () => {
//   connectedUserSocketId = null;
// };
