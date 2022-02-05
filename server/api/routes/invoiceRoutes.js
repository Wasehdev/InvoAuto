const express = require("express");
const router = express.Router();
const InvoiceController = require("../controller/invoiceController");

router.get("/", InvoiceController.index);

router.post("/", InvoiceController.create);

router.get("/:id", InvoiceController.show);
//create single invoice

module.exports = router;
