const { Task, Label } = require("../../../models");

exports.index = async (req, res) => {
  try {
    const task = await Task.findAll();
    return res.json(task);
  } catch (err) {
    return res.send("error");
  }
};

exports.show = async (req, res) => {
  let id = req.params.id;
  try {
    const task = await Task.findOne({ where: { id } });
    const label = await Label.findAll({ where: { tasksid: id } });
    return res.json({ task, label });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { task_name, description } = req.body;

  let task_labels = req.body.labels;

  task_labels = task_labels.replace(/\s/g, "");
  let labelsArr = task_labels.split(",");
  let invoiceId = Math.floor(Math.random() * (3 - 1) + 1);
  try {
    const user = await Task.create({
      task_name,
      description,
      invoiceId,
    }).then(async (task) => {
      for (let i = 0; i < labelsArr.length; i++) {
        let title = labelsArr[i];
        let tasksid = task.id;
        await Label.create({ title, tasksid });
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
  const {
    task_name,
    description,
    actual_hours,
    estimated_hours,
    invoiceId,
  } = req.body;
  let task_labels = req.body.labels;
  task_labels = task_labels.replace(/\s/g, "");
  let labelsArr = task_labels.split(",");
  try {
    const task = await Task.findOne({ where: { id } });

    task.task_name = task_name;
    task.description = description;
    task.actual_hours = actual_hours;
    task.estimated_hours = estimated_hours;
    task.invoiceId = invoiceId;

    await task.save();

    const label = await Label.findAll({
      where: { tasksid: id },
    });
    let labelIndexes = [];
    for (let i = 0; i < label.length; i++) {
      let value = label[i].id;
      labelIndexes.push(value);
    }
    for (let i = 0; i < label.length; i++) {
      let id = labelIndexes[i];
      if (id) {
        labelupdate = await Label.findOne({ where: { id } });
        labelupdate.title = labelsArr[i];
        await labelupdate.save();
      }
    }

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    Label.destroy({ where: { tasksid: id } }).then(async () => {
      Task.destroy({ where: { id } }).then(() => {
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
    const task = await Task.findAll({ where: { id } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.showByTaskName = async (req, res) => {
  let task_name = req.params.value;
  try {
    const task = await Task.findAll({ where: { task_name } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.showByInvoiceId = async (req, res) => {
  let invoiceId = req.params.value;
  try {
    const task = await Task.findAll({ where: { invoiceId } });
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
