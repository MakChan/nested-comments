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

app.use("/.netlify/functions/server/users", routes.user);
app.use("/.netlify/functions/server/comments", routes.comment);
// app.use("/users", routes.user);
// app.use("/messages", routes.message);

module.exports = app;

module.exports.handler = serverless(app);

// export async function handler(event, context) {
//   context.callbackWaitsForEmptyEventLoop = false;

//   // const db = await connectDb();
// //   conn = await connectDb(conn);

// //   console.log("connected ==>"); // TODO: remove this

//   return serverless(app)

// //   return new Promise((yay, nay) => {
// //     const cb = (err, args) => (err ? nay(err) : yay(args));
// //     server.createHandler({
// //       cors: {
// //         origin: true,
// //         credentials: true
// //       }
// //     })(event, context, cb);
// //   });
// }
