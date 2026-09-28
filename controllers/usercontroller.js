const users = require("../models/usermodle");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "fileds are required" });
    }
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const passwordhash = await bcrypt.hash(password, 10);
    const newuser = await users.create({ name, email, password: passwordhash });
    return res.status(201).json({ message: "New user created", newuser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Incroct email or passoerd" });
    }

    const userlogin = await users.findOne({ email });
    if (!userlogin) {
      return res.status(400).json({ message: "user not avablval" });
    }
    const haspassword = userlogin.password;
    const comparepassword = await bcrypt.compare(password, haspassword);
    if (comparepassword) {
      return res
        .status(201)
        .json({ message: "user login successfull", userlogin });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await users.find();
    console.log(usersList);
    return res
      .status(200)
      .json({ message: "user successfully fetch", usersList });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteUsersbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await users.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "user delete successfully", deleteduser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateuserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Incroct email or passoerd" });
    }
    console.log(id,name, email)
    const updateduser = await users.findByIdAndUpdate(id, {name, email});
    res.status(200).json({ message: "user updated", updateduser });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, getUsers, deleteUsersbyid, updateuserbyid };
