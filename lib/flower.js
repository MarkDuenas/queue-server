"use strict";

const client = require("socket.io-client");

const socket = client.connect("http://localhost:3000/caps");

socket.on("connect", () => {
  socket.emit("join", "flowers");
});

setInterval(() => {
  let obj = {
    store: "Flowers",
    message: "pick up object",
  };
  console.log(`New order to be picked up`);
  socket.emit("pickup", obj);
}, 5000);

socket.on("in-transit", transitHandler);

function transitHandler(message) {
  console.log(`FLOWERS: Got it! ${message.id} in transit!`);
  socket.emit("received", message);
}

socket.on("delivered", deliveredHandler);

function deliveredHandler(message) {
  console.log(`FLOWERS: Thank you for delivering ${message.id}`);
  socket.emit("received", message);
}

module.exports = { transitHandler, deliveredHandler };
