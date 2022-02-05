const express = require("express");
const router = express.Router();
const MemberController = require("../controller/memberController");

router.get("/", MemberController.index);
//create single member
router.post("/", MemberController.create);
//update single member
router.put("/:id", MemberController.update);
//delete single member
router.delete("/:id", MemberController.delete);

module.exports = router;
