const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "v$C";
const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ error: "Please enter all the requried fields" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(404).json({ error: "Password mismatch" });
    }
    const payload = { _id: user._id, name: user.fullName };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    user.password = null;
    return res
      .status(200)
      .json({ token: token, user, message: "Login successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const registerController = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;
  console.log(fullName, email, phoneNumber, password);

  if (!fullName || !email || !phoneNumber || !password) {
    return res
      .status(400)
      .json({ error: "Please enter all the required fields" });
  }

  if (fullName.length > 30) {
    return res
      .status(400)
      .json({ error: "Name can only be less than 30 characters" });
  }

  if (password.length <= 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  try {
    const alreadyExistsUserByEmail = await userModel.findOne({ email });
    //const alreadyExistsUserByPhoneNumber = await userModel.findOne({phoneNumber});
    if (alreadyExistsUserByEmail) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashPassword,
    });

    const result = await newUser.save();

    console.log(result);

    res.status(200).json({
      ...result._doc,
      success: true,
      message: "register successfully",
    });
    //const {fullName,email,phoneNumber} = req.body;
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

module.exports = { loginController, registerController };
