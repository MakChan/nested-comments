import "dotenv/config";

import models, { sequelize } from "./server/models";
import { createUsersWithPostsAndComments } from "./seed";
const app = require("./server/index");

const eraseDatabaseOnSync = false;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithPostsAndComments(models);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
