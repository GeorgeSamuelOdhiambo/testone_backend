const express = require('express');
const route = express.Router();

//self imports 
const postcontrol = require('../Controls/postcontrol');

route.post('/login',postcontrol.postlog);
route.post('/register',postcontrol.postSignup);
route.post('/saveSandbox',postcontrol.saveSandbox);

module.exports = route;