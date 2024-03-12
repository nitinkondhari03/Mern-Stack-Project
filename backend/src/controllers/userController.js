const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");

//Register User

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userfind = await User.findOne({ email });
    if (userfind) {
      return res.status(401).send({ message: "User Already Exists" });
    }
    const hashpassword = bcryptjs.hashSync(password, 8);
    const user = await User.create({ name, email, password: hashpassword });
    return res
      .status(201)
      .send({ data: user, message: "Registration Successful" });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

//Login User

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userfind = await User.findOne({ email });
    if (!userfind) {
      return res.status(401).send({ message: "Wrong Credentials" });
    }
    const isPasswordCheck = bcryptjs.compareSync(password, userfind.password);
    if (!isPasswordCheck) {
      return res.status(401).send({ message: "Wrong Credentials" });
    }
    const token = jwt.sign({ id: userfind._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    const data = {
      id: userfind._id,
      name: userfind.name,
      email: userfind.email,
    };
    return res.status(201).send({ data, token, message: "Login Successful" });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};
