const express = require("express");
const client = require("./connection.js");

client.connect();

const { Sequelize } = require("sequelize");
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
const PORT = 3000;

async function checkConnection() {
  const sequelize = new Sequelize("automation", "postgres", "alliswell", {
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

app.post("/users", (req) => {
  let id = "";
  const user = req.body;
  let label = user.labels;
  label = label.replace(/\s/g, "");
  let labelsArr = label.split(",");
  console.log(user);
  let result = client.query(
    `INSERT into users (name ,email) values ($1,$2) RETURNING id;`,
    [user.name, user.email]
  );
  result.then((response) => {
    id = response.rows[0].id;
    for (let i = 0; i < labelsArr.length; i++) {
      client.query(`INSERT into labels (title , usersid) values ($1,$2);`, [
        labelsArr[i],
        id,
      ]);
    }
  });
  client.end;
});

app.put("/users/:id", (req, res) => {
  let id = "";
  const user = req.body;
  let label = user.labels;
  label = label.replace(/\s/g, "");
  let labelsArr = label.split(",");
  console.log(user);
  let result = client.query(
    `update users set name = $1, email= $2 where id = $3`,
    [user.name, user.email, user.id]
  );
  result.then((response) => {
    id = user.id;
    for (let i = 0; i < labelsArr.length; i++) {
      client.query(`update labels set title=$1 , usersid=$2 where usersid=$ `, [
        labelsArr[i],
        id,
      ]);
    }
  });
  client.end;
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
