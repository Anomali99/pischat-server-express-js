const { Model, DataTypes } = require("@sequelize/core");
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

// Define associations
Chat.belongsTo(User, { as: "sender", foreignKey: "user_from_id" });
Chat.belongsTo(User, { as: "receiver", foreignKey: "user_to_id" });

module.exports = Chat;
