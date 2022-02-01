const express = require("express");
var cors = require("cors");
const TaskController = require("./api/controller/taskController");
const InvoiceController = require("./api/controller/invoiceController");
const LabelController = require("./api/controller/labelController");
const MemberController = require("./api/controller/memberController");

const { sequelize, tasks, invoices, labels, members } = require("./models");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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

//create new tasks

app.post("/tasks", TaskController.create);

//get all tasks

app.get("/tasks", TaskController.index);

app.get("/tasks/:id", TaskController.show);

//update single task
app.put("/tasks/:id", TaskController.update);

//delete single task

app.delete("/tasks/:id", TaskController.delete);

//get all invoices

app.get("/invoices", InvoiceController.index);
app.get("/invoices/:id", InvoiceController.show);

//create single invoice
app.post("/invoices", InvoiceController.create);

//get all labels

app.get("/labels", LabelController.index);
//create single label
app.post("/labels", LabelController.create);
//update single label
app.put("/labels/:id", LabelController.update);
//delete single label
app.delete("/labels/:id", LabelController.delete);

//get all members
app.get("/members", MemberController.index);
//create single member
app.post("/members", MemberController.create);
//update single member
app.put("/members/:id", MemberController.update);
//delete single member
app.delete("/members/:id", MemberController.delete);

// app.get("/:id", async (req, res) => {
//   let id = req.params.id;
//   invoices
//     .findByPk(id, { include: ["tasks"] })
//     .then((invoice) => {
//       return res.json(invoice);
//     })
//     .catch((err) => {
//       console.log(">> Error while finding tutorial: ", err);
//     });
// });

// app.get("/users/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     const user = await User.findOne({
//       where: { uuid },
//       include: "posts",
//     });

//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.post("/posts", async (req, res) => {
//   const { userUuid, body } = req.body;

//   try {
//     const user = await User.findOne({ where: { uuid: userUuid } });

//     const post = await Post.create({ body, userId: user.id });

//     return res.json(post);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// app.get("/posts", async (req, res) => {
//   try {
//     const posts = await Post.findAll({ include: "user" });

//     return res.json(posts);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// app.get("/users/:name", (req, res) => {
//   client.query(
//     "Select * from users where name= $1",
//     [req.params.name],
//     (err, result) => {
//       if (!err) {
//         res.send(result.rows);
//       } else res.send(err);
//     }
//   );
//   client.end;
// });

// app.post("/", (req, res) => {
//   let body = req.body;
//   let name = body.name;
//   console.log(name);
// });

// app.post("/users", (req) => {
//   let id = "";
//   const user = req.body;
//   let label = user.labels;
//   label = label.replace(/\s/g, "");
//   let labelsArr = label.split(",");
//   console.log(user);
//   let result = client.query(
//     `INSERT into users (name ,email) values ($1,$2) RETURNING id;`,
//     [user.name, user.email]
//   );
//   result.then((response) => {
//     id = response.rows[0].id;
//     for (let i = 0; i < labelsArr.length; i++) {
//       client.query(`INSERT into labels (title , usersid) values ($1,$2);`, [
//         labelsArr[i],
//         id,
//       ]);
//     }
//   });
//   client.end;
// });

// app.put("/users/:id", (req, res) => {
//   let id = "";
//   const user = req.body;
//   let label = user.labels;
//   label = label.replace(/\s/g, "");
//   let labelsArr = label.split(",");
//   console.log(user);
//   let result = client.query(
//     `update users set name = $1, email= $2 where id = $3`,
//     [user.name, user.email, user.id]
//   );
//   result.then((response) => {
//     id = user.id;
//     for (let i = 0; i < labelsArr.length; i++) {
//       client.query(`update labels set title=$1 , usersid=$2 where usersid=$ `, [
//         labelsArr[i],
//         id,
//       ]);
//     }
//   });
//   client.end;
// });

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
