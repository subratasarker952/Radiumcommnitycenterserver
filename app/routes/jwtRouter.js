const express = require("express");
const { generateAndSendJwt } = require("../controllers/jwtControllers");
const JwtRouter = express.Router();

JwtRouter.post("/", generateAndSendJwt);
module.exports = JwtRouter;
