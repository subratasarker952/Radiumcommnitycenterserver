const express = require("express");
const { genareteAndSendJwt } = require("../controllers/jwtControllers");
const JwtRouter = express.Router();

JwtRouter.post("/", genareteAndSendJwt);
module.exports = JwtRouter;
