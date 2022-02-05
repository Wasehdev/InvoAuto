const express = require("express");
var cors = require("cors");
const Sequelize = require("sequelize");
const taskRoutes = require("./api/routes/taskRoutes");
const labelRoutes = require("./api/routes/labelRoutes");
const memberRoutes = require("./api/routes/memberRoutes");
const invoiceRoutes = require("./api/routes/invoiceRoutes");
const sequelize = new Sequelize("invoauto", "postgres", "waseh8348", {
  host: "localhost",
  dialect: "postgres",
});
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
app.use("/invoices", invoiceRoutes);
//labels
app.use("/labels", labelRoutes);
//members
app.use("/members", memberRoutes);

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
  try {
    await sequelize.authenticate();
  } catch {
    console.log("db not connected");
  }
  console.log("Database Connected!");
});
