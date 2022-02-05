const express = require("express");
const router = express.Router();
const LabelController = require("../controller/labelController");

router.get("/", LabelController.index);
//create single label
router.post("/", LabelController.create);
//update single label
router.put("/:id", LabelController.update);
//delete single label
router.delete("/:id", LabelController.delete);

module.exports = router;
