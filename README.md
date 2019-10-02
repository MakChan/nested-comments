# nested-comments

A Hacker News clone with users, posts and nested comments made with React, Node.js/Express and Postgres.

Uses WITH Queries (Common Table Expressions) for comments.

### How to setup

1. Install and setup Git, PostgreSQL , yarn/npm and Node.

2. Get the source code:

   `git clone https://github.com/MakChan/nested-comments.git`

3. Create a new PostgreSQL database.

4. Open ".sample.env", add the following values according to created database and rename it to ".env":

   ```javascript
   DATABASE_NAME;
   DATABASE_USER;
   DATABASE_PASSWORD;
   DATABASE_HOST;
   ```

5. Install dependencies.

   ```
   yarn install
   ```

6. Run the application

   `yarn start`

7. Open the browser and the following url will open automatically.

   `localhost:3001`
