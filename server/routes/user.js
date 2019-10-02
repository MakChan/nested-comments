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

router.post("/register", async (req, res) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password
  });
  return res.send({ token: await createToken(user, "30d"), user });
});

router.post("/login", async (req, res) => {
  const user = await req.context.models.User.scope("withPassword").findOne({
    where: { username: req.body.username }
  });
  if (!user) {
    return res
      .status(404)
      .send({ message: "No user found with these login credentials." });
  }

  const isValid = await user.validatePassword(req.body.password);
  if (!isValid) {
    return res.status(401).send({ message: "Wrong credentials." });
  }

  return res.send({ token: await createToken(user, "30d"), user });
});

export default router;
