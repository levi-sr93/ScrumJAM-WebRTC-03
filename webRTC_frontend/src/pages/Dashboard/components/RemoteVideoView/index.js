import React, { useEffect, useRef } from "react";

const styles = {
  videoContainer: {
    width: "100%",
    height: "50%",
    margin: "0 auto",
    border: "1px solid green",
  },

  videoElement: {
    width: "100%",
    height: "100%",
  },
};

function RemoteVideoView({ remoteStream }) {
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay></video>
    </div>
  );
}

export default RemoteVideoView;
