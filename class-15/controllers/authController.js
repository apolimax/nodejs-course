const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) return res.sendStatus(401); // 401 Unathourized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user. We can use it to invalidated it when the user logs out
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save(); // updating the mongodb document

    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      /* secure: true, */ // to test with thunderclient should be commented
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }); // sending the refresh token as a http only cookie, javascript can't access it.

    res.json({ accessToken }); // sending the access token to the frontend
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
