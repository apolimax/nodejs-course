const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// should come before cors, sets Acces-Control-Allow-Credentials to true
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle url encoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

// serve statis files
app.use(express.static(path.join(__dirname, "/public")));

// unprotected routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh")); // gets the refresh token from the cookies and sends it a new access token
app.use("/logout", require("./routes/logout"));

// protected routes
app.use(verifyJWT); // every route below this will use the veryJWT middleware
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
