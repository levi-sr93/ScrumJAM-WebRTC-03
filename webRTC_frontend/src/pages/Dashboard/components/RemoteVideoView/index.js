import React, { useEffect, useRef } from "react";

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
    <div className="remote_video_contaner">
      <video className="remote_video" ref={remoteVideoRef} autoPlay></video>
    </div>
  );
}

export default RemoteVideoView;
