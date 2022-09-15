const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

// emit event every 2 seconds
setTimeout(() => {
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
