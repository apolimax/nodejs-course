const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
const whiteList = ["https://www.google.com", "http://127.0.0.1:3000"]; // PORT 3000 is a React App for example
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // !origin is important during development
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// built-in middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve statis files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public"))); //serve stati files to the /subdir router

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

/* Chaning examples start */
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
/* Chaning examples end */

/* if all sort of requests don't match with any routes above, then we'll send a 404 status code page */
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
