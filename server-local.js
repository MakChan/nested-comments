import "dotenv/config";

import models, { sequelize } from "./server/models";
import { seedDb } from "./seed";
import app from "./server/index";

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    seedDb(models);
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}!`);
  });
});
