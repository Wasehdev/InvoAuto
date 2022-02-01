const {
  sequelize,
  tasks,
  invoices,
  labels,
  members,
} = require("../../../models");

exports.index = async (req, res) => {
  try {
    const task = await labels.findAll();
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = {};

exports.create = async (req, res) => {
  const { title, taskId } = req.body;

  try {
    const label = await labels.create({
      title,
      taskId,
    });

    return res.json(label);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;
  const { title, invoiceId } = req.body;

  try {
    const label = await labels.findOne({ where: { id } });

    label.title = title;
    label.invoiceId = invoiceId;

    await label.save();

    return res.json(label);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    labels.destroy({ where: { id } }).then(async () => {
      console.log("deleted");
      return res.json({});
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
