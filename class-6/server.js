const express = require("express");
const app = express();

const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  /* res.sendFile("./views/index.html", { root: __dirname }); */
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page"); // default status code 302
});

// chaining route handles with next()
app.get(
  "/ola(.html)?",
  (req, res, next) => {
    console.log("attempted to load ola.html");
    return next();
  },
  (req, res) => {
    res.send("Olá mundo");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("finished chanining!");
};

app.get("/numbers(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
