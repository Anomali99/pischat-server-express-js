const express = require("express");
const userControllers = require("../controllers/users");
const Route = express.Router();

Route.post("/register", userControllers.register);
Route.post("/login", userControllers.login);

module.exports = Route;
