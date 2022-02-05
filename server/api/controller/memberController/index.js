const {
  sequelize,
  tasks,
  invoices,
  labels,
  members,
} = require("../../../models");

exports.index = async (req, res) => {
  try {
    const member = await members.findAll();
    return res.json(member);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.show = {};

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const member = await members.create({
      name,
    });

    return res.json(member);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;
  const { name } = req.body;

  try {
    const member = await members.findOne({ where: { id } });
    member.name = name;
    await member.save();

    return res.json(member);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    members.destroy({ where: { id } }).then(async () => {
      console.log("deleted");
      return res.json({});
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
