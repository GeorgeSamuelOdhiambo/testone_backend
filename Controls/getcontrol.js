const Sandbox = require("../Dbmodule/sandbox");

exports.getslash = async (req, res, next) => {
  try {
    const sandbox = await Sandbox.find().sort({ createdAt: -1 });
    res.status(200).json({sandbox});
  }catch (error) {
    console.log(error);
    res.status(200).json({error});
  }
};