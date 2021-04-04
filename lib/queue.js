"use strict";

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.storage = [];
  }

  enqueue(item) {
    this.storage.push(item);

    if (this.storage.length === 1) {
      this.front = item;
      this.rear = item;
    } else {
      this.rear = item;
    }
    return this;
  }

  dequeue() {
    if (this.isEmpty() === false) {
      return null;
    }

    let item = this.storage.shift();

    if (this.storage.length === 0) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.storage[0];
      this.read = this.storage[this.storage.length - 1];
    }

    return item;
  }

  peek() {
    return this.front;
  }

  isEmpty() {
    return this.front ? true : false;
  }
}

module.exports = Queue;
