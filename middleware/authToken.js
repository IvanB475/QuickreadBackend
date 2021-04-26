const got = require("got");

exports.validateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  const httpHeaders = {
    Authorization: token,
  };
  try {
    const response = await got("validateToken", {
      prefixUrl: "http://localhost:8020",
      headers: httpHeaders,
    });

    next();
  } catch (e) {
    res.status(403).json({ message: "you're not authorized to use this api" });
  }
};
