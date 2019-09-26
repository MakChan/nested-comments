import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const createToken = async (user, expiresIn) => {
  const secret = process.env.SECRET;
  const { id, name, username } = user;
  return await jwt.sign({ id, name, username }, secret, {
    expiresIn
  });
};

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

router.post("/signup", async (req, res) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password
  });
  return { token: createToken(user, "30d"), user };
});

router.post("/signin", async (req, res) => {
  const user = await req.context.models.User.findByLogin(req.body.username);
  if (!user) {
    res.status(400).send("No user found with this login credentials.");
  }

  const isValid = await user.validatePassword(req.body.password);
  if (!isValid) {
    res.status(401).send("No user found with this login credentials.");
  }
  return { token: createToken(user, "30d"), user };
});

export default router;
