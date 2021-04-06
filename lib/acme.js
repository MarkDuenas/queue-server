"use strict";

const client = require("socket.io-client");

const socket = client.connect("http://localhost:3000/caps");

socket.on("connect", () => {
  socket.emit("join", "acme");
});

setInterval(() => {
  let obj = {
    store: "Acme",
    message: "pick up object",
  };
  console.log(`New order to be picked up`);
  socket.emit("pickup", obj);
}, 5000);

socket.on("in-transit", transitHandler);

function transitHandler(message) {
  console.log(` ACME: Got it! ${message.id} in transit!`);
  socket.emit("received", message);
}

socket.on("delivered", deliveredHandler);

function deliveredHandler(message) {
  console.log(`ACME: Thank you for delivering ${message.id}`);
  socket.emit("received", message);
}

module.exports = { transitHandler, deliveredHandler };
