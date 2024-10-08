const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //   const token = req.body.token;

  if (token) {
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verified", verified);
      if (verified) {
        const user = await User.findOne({ _id: verified.id });

        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).send("Access Denied1");
        }
      } else {
        res.status(401).send("Access Denied2");
      }
    } catch (error) {
      res.status(401).send("Access Denied3");
    }
  } else {
    res.status(401).send("Access Denied4");
  }
};

module.exports = { authMiddleware };
