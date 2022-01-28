const express = require("express");
var cors = require("cors");
const { sequelize, tasks, invoices } = require("./models");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
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

app.post("/tasks", async (req, res) => {
  const {
    task_name,
    description,
    actual_hours,
    estimated_hours,
    invoiceId,
  } = req.body;

  try {
    const user = await tasks
      .create({
        task_name,
        description,
        actual_hours,
        estimated_hours,
        invoiceId,
      })
      .then((task) => {});

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
app.post("/invoices", async (req, res) => {
  const { description, billable_hours } = req.body;

  try {
    const invoice = await invoices.create({
      description,
      billable_hours,
    });

    return res.json(invoice);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const task = await tasks.findAll();
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/invoices", async (req, res) => {
  try {
    const task = await invoices.findAll();

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

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

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await tasks.findOne({ where: { id } });
    await user.destroy();
    return res.json({ message: "User deleted!" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const {
    task_name,
    description,
    actual_hours,
    estimated_hours,
    invoiceId,
  } = req.body;
  try {
    const task = await tasks.findOne({ where: { id } });

    task.task_name = task_name;
    task.description = description;
    task.actual_hours = actual_hours;
    task.estimated_hours = estimated_hours;
    task.invoiceId = invoiceId;

    await task.save();

    return res.json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

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
  console.log("Server up on http://localhost:3000");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
