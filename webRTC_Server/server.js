const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});

//socketIO server
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("connection", null);
  console.log("new user connected");
  console.log(socket.id);

  socket.on("join-room", (data) => {
    socket.join(data.roomId);

    io.to(data.roomId).emit("new-user-joined", { socketId: data.socketId });

    console.log("Room: ", socket.adapter.rooms);
  });

  socket.on("new-user-start", (data) => {
    io.to(data.to).emit("new-user-start", { from: data.from });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //events listeners related with direct call

  socket.on("webRTC-offer", (data) => {
    console.log("handling webRTC offer");
    io.to(data.calleeSocketId).emit("webRTC-offer", {
      user: socket.id,
      offer: data.offer,
    });
  });

  socket.on("webRTC-answer", (data) => {
    console.log("handling webRTC answer");
    io.to(data.callerSocketId).emit("webRTC-answer", {
      user: socket.id,
      answer: data.answer,
    });
  });

  socket.on("webRTC-candidate", (data) => {
    console.log("Handling ICE candidate", data);
    io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
      user: socket.id,
      candidate: data.candidate,
    });
  });
});
