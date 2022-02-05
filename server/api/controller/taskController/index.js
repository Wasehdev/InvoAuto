const { tasks, labels } = require("../../../models");

exports.index = async (req, res) => {
  try {
    const task = await tasks.findAll();
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  let id = req.params.id;
  try {
    const task = await tasks.findOne({ where: { id } });
    const label = await labels.findAll({ where: { taskId: id } });
    return res.json({ task, label });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { task_name, description, actual_hours, estimated_hours } = req.body;

  let task_labels = req.body.labels;

  task_labels = task_labels.replace(/\s/g, "");
  let labelsArr = task_labels.split(",");
  let invoiceId = Math.floor(Math.random() * (3 - 1) + 1);
  try {
    const user = await tasks
      .create({
        task_name,
        description,
        invoiceId,
      })
      .then(async (task) => {
        for (let i = 0; i < labelsArr.length; i++) {
          let title = labelsArr[i];
          let taskId = task.id;
          await labels.create({ title, taskId });
        }
      });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { task_name, description, actual_hours, estimated_hours, invoiceId } =
    req.body;
  let task_labels = req.body.labels;
  task_labels = task_labels.replace(/\s/g, "");
  let labelsArr = task_labels.split(",");
  try {
    const task = await tasks.findOne({ where: { id } });

    task.task_name = task_name;
    task.description = description;
    task.actual_hours = actual_hours;
    task.estimated_hours = estimated_hours;
    task.invoiceId = invoiceId;

    await task.save();

    const label = await labels.findAll({
      where: { taskId: id },
    });
    let labelIndexes = [];
    for (let i = 0; i < label.length; i++) {
      let value = label[i].id;
      labelIndexes.push(value);
    }
    for (let i = 0; i < label.length; i++) {
      let id = labelIndexes[i];
      if (id) {
        labelupdate = await labels.findOne({ where: { id } });
        labelupdate.title = labelsArr[i];
        await labelupdate.save();
      }
    }

    res.json(labelupdate);

    return res.json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    labels.destroy({ where: { taskId: id } }).then(async () => {
      tasks.destroy({ where: { id } }).then(() => {
        console.log("deleted");
      });
    });
    return res.json({});
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.showById = async (req, res) => {
  let id = req.params.value;
  try {
    const task = await tasks.findAll({ where: { id } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.showByTaskName = async (req, res) => {
  let task_name = req.params.value;
  try {
    const task = await tasks.findAll({ where: { task_name } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.showByInvoiceId = async (req, res) => {
  let invoiceId = req.params.value;
  try {
    const task = await tasks.findAll({ where: { invoiceId } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
