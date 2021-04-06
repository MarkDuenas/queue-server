"use strict";

const pickupHandler = require("../lib/driver.js");

describe(" Driver TEST", () => {
  const order = {
    storeName: "Random Store",
    orderID: "123456789",
    customerName: "Jake",
    address: "123 Baker Street",
  };

  let spy;

  beforeEach(() => {
    spy = jest.spyOn(console, "log");
    jest.useFakeTimers();
  });

  afterEach(() => {
    spy.mockRestore();
    jest.useRealTimers();
  });

  it("should console log on pickup", () => {
    pickupHandler(order);
    jest.advanceTimersByTime(3000);
    expect(spy).toHaveBeenCalled();
    jest.advanceTimersByTime(6000);
    expect(spy).toHaveBeenCalled();
  });
});
