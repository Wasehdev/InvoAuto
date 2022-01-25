const express = require("express");

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
  const sequelize = new Sequelize("invoauto", "postgres", "waseh8348", {
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

checkConnection();

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  res.send("success");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
