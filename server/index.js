const express = require("express");
const client = require("./connection.js");

client.connect();

const { Sequelize } = require("sequelize");
const app = express();
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json());
const PORT = 3000;

async function checkConnection() {
  const sequelize = new Sequelize("postgres", "postgres", "waseh8348", {
    host: "localhost",
    dialect: "postgres",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
//checkConnection();

app.get("/users", (req, res) => {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err);
    }
  });
  client.end;
});

app.get("/users/:name", (req, res) => {
  client.query(
    "Select * from users where name= $1",
    [req.params.name],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else res.send(err);
    }
  );
  client.end;
});

app.post("/", (req, res) => {
  let body = req.body;
  let name = body.name;
  console.log(name);
});

app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  client
    .query(
      `INSERT INTO "users" ("name", "email")
  VALUES ($1, $2)`,
      [user.name, user.email]
    )
    .then(res.send("Insertion was successful"));
  client.end;
});

app.put("/users/:id", (req, res) => {
  let user = req.body;

  client.query(
    `update users set email = $1 where name = $2`,
    [user.email, user.name],
    (err, result) => {
      if (!err) {
        res.send("Update was successful");
      } else {
        res.send(err);
      }
    }
  );
  client.end;
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
