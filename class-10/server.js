const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve statis files
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));

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
