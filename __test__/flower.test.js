const { transitHandler, deliveredHandler } = require("../lib/flower.js");

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
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it("should console log on delivered", () => {
    deliveredHandler(order);
    expect(spy).toHaveBeenCalled();
  });

  it("should console log on transit", () => {
    transitHandler(order);
    expect(spy).toHaveBeenCalled();
  });
});
