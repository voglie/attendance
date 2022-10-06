const express = require("express");
const { auth } = require("../middlewares/auth");

const {
  cnPageView,
  admPageView,
  oswPageView,
  dosPageView,
  tocPageView,
  ppPageView,
  statusChange,
} = require("../controller/attendance.controller");

const route = express.Router();

route.get("/status/:id", auth, statusChange);
route.get("/adm", auth, admPageView);
route.get("/cn", auth, cnPageView);
route.get("/osw", auth, oswPageView);
route.get("/dos", auth, dosPageView);
route.get("/toc", auth, tocPageView);
route.get("/pp", auth, ppPageView);

module.exports = route;
