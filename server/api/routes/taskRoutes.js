const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");

router.post("/", TaskController.create);
//get all
router.get("/", TaskController.index);
router.get("/:id", TaskController.show);
router.get("/id/:value", TaskController.showById);
router.get("/invoiceId/:value", TaskController.showByInvoiceId);
router.get("/task_name/:value", TaskController.showByTaskName);

//update single task
router.put("/:id", TaskController.update);

//delete single task

router.delete("/:id", TaskController.delete);

module.exports = router;
