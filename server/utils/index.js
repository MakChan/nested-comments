const requiresLogin = function(req, res, next) {
  if (!req.context.me) {
    const err = new Error("Not authorized");
    next(err);
  }
  return next();
};


export { requiresLogin };
