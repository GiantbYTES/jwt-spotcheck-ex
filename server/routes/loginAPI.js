const express = require("express");
const router = express.Router();
const users = require("../../fakeDB/users");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//we generate the salt for the password
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const secretKey = "my_secret_key";

router.post("/login", (req, res) => {
  const user = authenticateUser(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const accessToken = generateAccessToken(user);
  res.send({ accessToken });
});

function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return { id: user.id, username: user.username };
}

function generateAccessToken(user) {
  return jwt.sign(user, secretKey);
}

module.exports = router;
