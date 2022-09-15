const fs = require("fs");

if (!fs.existsSync("./new")) {
  // if folder doesn't exist
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directed created");
  });
}

if (fs.existsSync("./new")) {
  // if folder exist
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directed removed");
  });
}
