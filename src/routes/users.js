const express = require("express");
const usersControllers = require("../controllers/users");
const Route = express.Router();

Route.get("/:uuid", usersControllers.getUsers);

module.exports = Route;
