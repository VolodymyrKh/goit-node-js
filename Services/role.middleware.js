exports.roleMiddleware = (roleList) => (req, res, next) => {
  const { role } = req.contact;
  if (!roleList.includes(role)) {
    res.status(403).send("Forbidden");
    return;
  }
  next();
};
