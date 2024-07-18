const User = require("../models/User");
const response = require("../config/response");
const { Op } = require("@sequelize/core");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        where: { user_uuid: { [Op.ne]: req.params.uuid } },
        attributes: ["user_uuid", "username", "name"],
      });
      response(res, 200, "success", users);
    } catch (error) {
      response(res, 500, "Internal Server Error", []);
    }
  },
};
