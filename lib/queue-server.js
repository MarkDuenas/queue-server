"use strict";

const uuid = require("uuid").v4;
const io = require("socket.io")(3000);

const queue = {
  flowers: {
    pickup: {},
    intransit: {},
    delivered: {},
  },
  acme: {
    pickup: {},
    intransit: {},
    delivered: {},
  },
};

const caps = io.of("/caps");

caps.on("connection", (socket) => {
  console.log("Welcome", socket.id);
  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("pickup", (payload) => {
    if (payload.store === "Flowers") {
      console.log("PICK UP", payload);
      let id = uuid();
      queue.flower.pickup[id] = payload;
      caps.emit("pickup", { id, payload });
    } else {
      console.log("PICK UP", payload);
      let id = uuid();
      queue.acme.pickup[id] = payload;
      caps.emit("pickup", { id, payload });
    }
  });

  socket.on("received", (message) => {
    if (message.payload.store === "Acme") {
      deleteAcmeQueue(message);
    } else {
      deleteFlowerQueue(message);
    }
  });

  socket.on("getall", () => {
    Object.keys(queue.flower.pickup).forEach((id) => {
      caps.emit("pickup", { id, payload: queue.pickup[id] });
    });

    Object.keys(queue.acme.pickup).forEach((id) => {
      caps.emit("pickup", { id, payload: queue.pickup[id] });
    });
  });

  socket.on("in-transit", (message) => {
    if (message.payload.store === "Flowers") {
      console.log(`Transiting ${message.id}, adding to transit q`);
      queue.flower.intransit[message.id] = message.payload;
      socket.to("flowers").emit("in-transit", message);
    } else {
      console.log(`Transiting ${message.id}, adding to transit q`);
      queue.acme.intransit[message.id] = message.payload;
      socket.to("acme").emit("in-transit", message);
    }
  });

  socket.on("delivered", (message) => {
    if (message.payload.store === "Flowers") {
      console.log(`Package ${message.id} is being added to delivered q`);
      queue.flower.delivered[message.id] = message.payload;
      socket.to("flowers").emit("delivered", message);
    } else {
      console.log(`Package ${message.id} is being added to delivered q`);
      queue.acme.delivered[message.id] = message.payload;
      socket.to("acme").emit("delivered", message);
    }
  });
});

function deleteFlowerQueue(message) {
  if (queue.flower.pickup[message.id]) {
    console.log(`Deleting ${message.id} from pickup queue`);
    delete queue.flower.pickup[message.id];
  } else if (queue.flower.intransit[message.id]) {
    console.log(`Deleting ${message.id} from intransit queue`);
    delete queue.flower.intransit[message.id];
  } else {
    console.log(`Deleting ${message.payload} from delivered queue`);
    delete queue.flower.delivered[message.id];
  }
}

function deleteAcmeQueue(message) {
  if (queue.acme.pickup[message.id]) {
    console.log(`Deleting ${message.id} from pickup queue`);
    delete queue.acme.pickup[message.id];
  } else if (queue.acme.intransit[message.id]) {
    console.log(`Deleting ${message.id} from intransit queue`);
    delete queue.acme.intransit[message.id];
  } else {
    console.log(`Deleting ${message.payload} from delivered queue`);
    delete queue.acme.delivered[message.id];
  }
}
