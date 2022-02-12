const express = require("express");
require("dotenv").config();
var cors = require("cors");
const { Sequelize } = require("sequelize");
const taskRoutes = require("./api/routes/taskRoutes");
const labelRoutes = require("./api/routes/labelRoutes");
// const memberRoutes = require("./api/routes/memberRoutes");
// const invoiceRoutes = require("./api/routes/invoiceRoutes");
// const database = process.env.DATABASE;
// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

//middlewares
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});
app.use(express.json());

//tasks
app.use("/tasks", taskRoutes);
//invoices
// app.use("/invoices", invoiceRoutes);
//labels
app.use("/labels", labelRoutes);
//members
// app.use("/members", memberRoutes);

app.listen({ port: 5000 }, async () => {
  console.log(`Server up on http://localhost:${5000}`);

  sequelize
    .authenticate()
    .then(console.log("connected"))
    .catch((err) => console.log(err));
});
