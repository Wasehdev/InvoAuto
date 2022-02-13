const { Label } = require("../../../models");

exports.index = async (req, res) => {
  try {
    const task = await Label.findAll();
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = {};

exports.create = async (req, res) => {
  const { title, tasksid } = req.body;

  try {
    const label = await Label.create({
      title,
      tasksid,
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
    const label = await Label.findOne({ where: { id } });

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
    Label.destroy({ where: { id } }).then(async () => {
      console.log("deleted");
      return res.json({});
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
