const { Sequelize, DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/database");
const User = require("./User");

class Chat extends Model {}

Chat.init(
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_uuid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_from_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    user_from_uuid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_to_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    user_to_uuid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
    timestamps: false,
  }
);

User.hasMany(Chat, { foreignKey: "user_from_id", as: "sentChats" });
User.hasMany(Chat, { foreignKey: "user_to_id", as: "receivedChats" });
Chat.belongsTo(User, { foreignKey: "user_from_id", as: "userFrom" });
Chat.belongsTo(User, { foreignKey: "user_to_id", as: "userTo" });

module.exports = Chat;
