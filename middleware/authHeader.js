exports.validateUserThroughHeader = (req, res, next) => {
  const authHeaderCode = req.header("Authorization");
  const authSecretCode = process.env.HEADER_SECRET;
  console.log(authSecretCode + authHeaderCode);
  if (authSecretCode === authHeaderCode) {
    next();
  } else {
    res.status(403).json({ message: "Access forbidden" });
  }
};
