const express = require("express");
const {
  getData,
  getDataById,
  deleteData,
  updateData,
  postData,
} = require("../controllers/csaControllers");
const router = express.Router();

//middleware

router.get("/", getData); //csa

router.get("/:id", getDataById); //csa/:id

router.post("/", postData); //csa

router.put("/:id", updateData); //csa/:id

router.delete("/:id", deleteData); //csa/:id

module.exports = router;
