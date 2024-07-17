const { Server } = require("socket.io");
const http = require("http");

module.exports = function (app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("message", (message) => {
      console.log(`Received message: ${message}`);
      io.emit("message", `Echo: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });

    socket.on("error", (error) => {
      console.error(`WebSocket error: ${error}`);
    });
  });

  return server;
};
