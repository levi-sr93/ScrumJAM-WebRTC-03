import socketClient from "socket.io-client";
import store from "../../redux/store";

import * as dashboardActions from "../../redux/actions/dashboardActions";
import * as webRTCHandler from "../webRTC/webRTCHandler";

const SERVER = "http://localhost:5000";

let socket;
let callee;
let caller;

export const connectWithWebsocket = () => {
  socket = socketClient(SERVER);

  socket.on("connection", () => {
    console.log("Successfully connected with websocket");
    console.log(socket.id);
  });

  socket.on("broadcast", (data) => {});

  socket.on("new-user-joined", (data) => {
    callee = data.socketId;
    socket.emit("new-user-start", { to: data.socketId, from: socket.id });
    webRTCHandler.getLocalStream(callee, false);
  });

  socket.on("new-user-start", (data) => {
    caller = data.from;
    webRTCHandler.getLocalStream(caller, true);
  });

  socket.on("webRTC-offer", (data) => {
    webRTCHandler.handleOffer(data);
  });

  socket.on("webRTC-answer", (data) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on("webRTC-candidate", (data) => {
    webRTCHandler.handleCandidate(data);
  });
};

export const registerNewUser = (data) => {
  socket.emit("join-room", {
    // username: data.username,
    roomId: data,
    socketId: socket.id,
  });

  webRTCHandler.getLocalStream(socket.id);
};

//emitting events to server related to call

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};
