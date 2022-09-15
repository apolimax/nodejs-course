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

module.exports = corsOptions;
