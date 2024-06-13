const jwt=require('jsonwebtoken')

const generateAndSendJwt = (req, res) => {
  const token = jwt.sign(req.body, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  return res.send({ token });
};
module.exports = {generateAndSendJwt}
