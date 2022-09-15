/* const fs = require("fs"); */
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "starter.txt"),
      "utf-8"
    );
    console.log(data);

    await fsPromises.writeFile(path.join(__dirname, "promiseWrite.txt"), data);
    await fsPromises.appendFile(
      path.join(__dirname, "promiseWrite.txt"),
      "\n\nAppended text"
    );
    await fsPromises.rename(
      path.join(__dirname, "promiseWrite.txt"),
      path.join(__dirname, "promiseWriteRenamed.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "promiseWriteRenamed.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();

/* fs.readFile("./starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
}); */

/* fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("I show up first because I run syncronously");

fs.writeFile(
  path.join(__dirname, "reply.txt"),
  "Nice talking to you",
  (err) => {
    if (err) throw err;
    console.log("Writing completed");

    fs.appendFile(
      path.join(__dirname, "reply.txt"),
      "\n\nTesting fs appendFile",
      (err) => {
        if (err) throw err;
        console.log("Appending completed");

        fs.rename(
          path.join(__dirname, "reply.txt"),
          path.join(__dirname, "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename completed");
          }
        );
      }
    );
  }
); */

/* fs.appendFile(
  path.join(__dirname, "appendedFile.txt"),
  "Testing fs appendFile",
  (err) => {
    if (err) throw err;
    console.log("Appending completed");
  }
); */
