const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const duplicate = usersDB.users.find((person) => person.username === user);

  if (duplicate) return res.sendStatus(409); // 409 Conflict code
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // store the new user
    const newUser = { username: user, pwd: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({
      success: `New user ${newUser.username} created!`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
