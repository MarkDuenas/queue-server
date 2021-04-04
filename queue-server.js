"use strict";

const uui = require("uuid").v4;
const io = require("socket.io")(3000);

const queue = {};
