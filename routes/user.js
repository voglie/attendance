const express = require("express");
const { auth } = require('../middlewares/auth');

const {
  login,
  register,
  logout,
  loginView,
} = require("../controller/user.controller");

const route = express.Router();

route.get('/', loginView);
route.post('/login', login);
route.post('/register', register);
route.get('/logout', logout);

module.exports = route;
