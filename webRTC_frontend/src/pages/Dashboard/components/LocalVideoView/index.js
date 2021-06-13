import React, { useEffect, useRef } from "react";

const styles = {
  videoContainer: {
    width: "200px",
    height: "200px",
    borderRadius: "20px",
    position: "absolute",
    top: "5%",
    right: "2%",
  },

  videoElement: {
    width: "100%",
    height: "100%",
  },
};

function LocalVideoView({ localStream }) {
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer} className="background_secondary_color">
      <video
        style={styles.videoElement}
        ref={localVideoRef}
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default LocalVideoView;
