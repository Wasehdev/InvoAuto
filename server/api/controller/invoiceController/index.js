const { Task, Invoice } = require("../../../models");

exports.index = async (req, res) => {
  try {
    const invoice = await Invoice.findAll();

    return res.json(invoice);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = async (req, res) => {
  let id = req.params.id;
  try {
    const invoice = await Invoice.findOne({ where: { id }, include: Task });
    return res.json(invoice);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.create = async (req, res) => {
  const { description, billable_hours } = req.body;

  try {
    const invoice = await Invoice.create({
      description,
      billable_hours,
    });

    // const task = await Invoice.createtask({ task_name });

    return res.json(invoice), task;
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.update = {};
exports.delete = {};
