const { Server } = require("socket.io");
const http = require("http");

const socketController = require("../controllers/socket");

module.exports = function (app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(socketController.checkUser);

  io.on("connection", async (socket) => {
    const userUUID = socket.handshake.query.user_uuid;
    const toUUID = socket.handshake.query.to_uuid;
    const room = socketController.generateRoom(userUUID, toUUID);

    if (room) {
      socket.join(room);
      console.log(`${userUUID} || ${socket.id} connected to room ${room}`);

      let chats = await socketController.getChats(userUUID, toUUID);
      socket.emit("chats", chats);

      socket.on("send-chat", async (value) => {
        await socketController.addChat(value, userUUID, toUUID);
        chats = await socketController.getChats(userUUID, toUUID);
        io.to(room).emit("chats", chats);
      });

      socket.on("disconnect", () => {
        console.log(
          `${userUUID} || ${socket.id} disconnected from room ${room}`
        );
      });

      socket.on("error", (error) => {
        console.error(`WebSocket error: ${error}`);
      });
    } else {
      console.error(`User ${userUUID} did not specify a room.`);
    }
  });
  return server;
};
