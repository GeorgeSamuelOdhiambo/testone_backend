const express = require("express");
const isAuth = require("../Authcheck/is_Auth");
const route = express.Router();

//self imports
const getcontrol = require("../Controls/getcontrol");

route.get("/", getcontrol.getslash);

module.exports = route;
