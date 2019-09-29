const requiresLogin = function(req, res, next) {
  console.log("req.context.me ==>", req.context.me); // TODO: remove this
  if (!req.context.me) {
    const err = new Error("Not authorized");
    next(err);
  }
  return next();
};

export { requiresLogin };
