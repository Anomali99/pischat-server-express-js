const express = require("express");
const authControllers = require("../controllers/auth");
const Route = express.Router();

Route.post("/register", authControllers.register);
Route.post("/login", authControllers.login);

module.exports = Route;
