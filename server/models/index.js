import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  { host: "localhost", port: "5432", dialect: "postgres" }
);

const models = {
  Comment: sequelize.import("./comment"),
  Post: sequelize.import("./post"),
  User: sequelize.import("./user"),
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
