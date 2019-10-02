import Sequelize from "sequelize";
import pg from "pg";

import User from "./user";
import Comment from "./comment";
import Post from "./post";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectModule: pg
  }
);

const models = {
  Comment: sequelize.import("Comment", Comment),
  Post: sequelize.import("Post", Post),
  User: sequelize.import("User", User)
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
