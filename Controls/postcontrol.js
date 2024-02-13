const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("../Dbmodule/postmod");
const User = require("../Dbmodule/usermod");
const Sandbox = require("../Dbmodule/sandbox");

comparepass = async (cupass, dbpass) => {
  return bcrypt.compare(cupass, dbpass);
};

exports.postlog = async (req, res, next) => {
  try {
    const cupass = req.body.password;
    let user;
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      const error = new Error("Email not found");
      error.statusCode = 401;
      throw error;
    }
    user = result;
    const passequal = await comparepass(cupass, result.password);

    if (!passequal) {
      const error = new Error("Password hot a mach");
      error.statuscode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECREAT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      userId: user._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log("Error in login control" + error);
    res.status(500).json({ massage: "Login error" });
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const hassp = await bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hassp,
    });

    const result = await user.save();
    res.status(201).json({
      message: "User Created",
      userId: result._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(500).json({ massage: "Something went wrong" });
    console.log("User not created" + error);
  }
};

exports.saveSandbox = async (req, res, next) => {
  try {
    const { code, output } = req.body;
    const sandbox = new Sandbox({
      code,
      result: output,
    });

    const result = await sandbox.save();
    res.status(201).json({
      message: "Post Saved",
      userId: result._id,
    });
  } catch (error) {
    res.status(500).json({ massage: "Something went wrong" });
    console.log("Sandbox not saved" + error);
  }
};
