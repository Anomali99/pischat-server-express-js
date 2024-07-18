const User = require("../models/User");
const Chat = require("../models/Chat");
const { Op } = require("@sequelize/core");
const uuid = require("uuid");

module.exports = {
  checkUser: async (socket, next) => {
    const userUUID = socket.handshake.query.user_uuid;
    const user = await User.findOne({
      where: { user_uuid: userUUID },
    });
    if (user) {
      return next();
    }
    return next(new Error("Invalid user_uuid"));
  },

  addChat: async (message, user_from_uuid, user_to_uuid) => {
    try {
      const users = await User.findAll({
        where: {
          user_uuid: { [Op.or]: [user_from_uuid, user_to_uuid] },
        },
        attributes: ["user_uuid", "user_id"],
      });
      let userFrom;
      let userTo;
      for (const user of users) {
        if (user.user_uuid == user_from_uuid) {
          userFrom = user;
        } else if (user.user_uuid == user_to_uuid) {
          userTo = user;
        }
      }
      const chat = Chat.build({
        chat_uuid: uuid.v4(),
        user_from_id: userFrom.user_id,
        user_from_uuid: userFrom.user_uuid,
        user_to_id: userTo.user_id,
        user_to_uuid: userTo.user_uuid,
        message: message,
        datetime: new Date(),
      });
      await chat.save();
      console.log("New chat created:", chat.message);
    } catch (error) {
      console.log("failed", error.message);
    }
  },

  getChats: async (uuid_from, uuid_to) => {
    try {
      const chats = await Chat.findAll({
        attributes: [
          "chat_uuid",
          "user_from_uuid",
          "user_to_uuid",
          "message",
          "datetime",
          "read",
        ],
        where: {
          [Op.or]: [
            {
              user_from_uuid: uuid_from,
              user_to_uuid: uuid_to,
            },
            {
              user_from_uuid: uuid_to,
              user_to_uuid: uuid_from,
            },
          ],
        },
      });
      await Chat.update(
        { read: true },
        {
          where: {
            user_from_uuid: uuid_to,
            user_to_uuid: uuid_from,
          },
        }
      );
      return chats;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  generateRoom: (uuid1, uuid2) => {
    let inputs = [uuid1, uuid2].sort();
    return `${inputs[0]}-${inputs[1]}`;
  },
};
