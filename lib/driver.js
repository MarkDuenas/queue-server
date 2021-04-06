"use strict";

const client = require("socket.io-client");

const socket = client.connect("http://localhost:3000/caps");

socket.emit("getall");

socket.on("pickup", pickupHandler);

function pickupHandler(message) {
  console.log(`I received order ${message.id}`);
  socket.emit("received", message);

  setTimeout(() => {
    console.log(`DRIVER: ${message.id} is now in transit.`);
    socket.emit("in-transit", message);
  }, 3000);

  setTimeout(() => {
    console.log(`DRIVER: ${message.id} has now been delivered`);
    socket.emit("delivered", message);
  }, 6000);
}

module.exports = pickupHandler;
