const { tasks, invoices } = require("../../../models");

exports.index = async (req, res) => {
  try {
    const task = await invoices.findAll();

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  let id = req.params.id;
  try {
    const invoice = await invoices.findOne({ where: { id }, include: tasks });
    return res.json(invoice);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { description, billable_hours, task_name } = req.body;

  try {
    const invoice = await invoices.create({
      description,
      billable_hours,
    });

    const task = await invoices.createtask({ task_name });

    return res.json(invoice), task;
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.update = {};
exports.delete = {};
