var jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .send({ error: true, message: "You have Not A Token" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ error: true, message: "Your token is not valid" });
      }
      // req.decoded = decoded
      req.user = decoded;
      const sameUser = decoded.email == req.query.email;
      if (!sameUser) {
        return res
          .status(401)
          .send({ error: true, message: "You Are Not A Valid User" });
      }
      next();
    });
  };
  const verifyAdmin = async (req, res, next) => {
    const email = req.user.email;
    const user = await userCollection.findOne({ email });
    if (user.role !== "admin") {
      return res
        .status(403)
        .send({ error: true, message: "You are not admin" });
    }
    next();
  };
  module.exports = {verifyUser,verifyAdmin }