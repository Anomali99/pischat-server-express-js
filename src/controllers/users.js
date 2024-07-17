const User = require("../models/User");
const response = require("../config/response");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      console.log(req.body);
      const exists = await User.findOne({
        where: { username: req.body.username },
      });
      if (exists) {
        response(res, 400, "username exists");
        return;
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = User.build({
        user_uuid: uuid.v4(),
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
      });
      await user.save();
      response(res, 200, "register success", {
        user_uuid: user.user_uuid,
        username: user.username,
        name: user.name,
      });
    } catch (error) {
      response(res, 500, "Internal Server Error");
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        response(res, 400, "username is incorrect");
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        response(res, 400, "password is incorrect");
        return;
      }
      response(res, 200, "login success", {
        user_uuid: user.user_uuid,
        username: user.username,
        name: user.name,
      });
    } catch (error) {
      response(res, 500, "Internal Server Error");
    }
  },
};
