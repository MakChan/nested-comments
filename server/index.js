import "dotenv/config";
import express from "express";
import serverless from "serverless-http";

import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      console.log("e ==>", e);
    }
  }
};

app.use(async (req, res, next) => {
  const me = await getMe(req);

  req.context = {
    models,
    sequelize,
    me
  };

  next();
});

app.use("/.netlify/functions/index/users", routes.user);
app.use("/.netlify/functions/index/posts", routes.post);
app.use("/.netlify/functions/index/comments", routes.comment);

const connection = {};
const connectToDatabase = async () => {
  if (connection.isConnected) return models;

  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  return models;
};

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = true;
  await connectToDatabase();

  const serverlessHandler = serverless(app);

  return await serverlessHandler(event, context);
}
