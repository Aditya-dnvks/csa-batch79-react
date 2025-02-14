const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getData,
  getDataById,
  deleteData,
  updateData,
  postData,
} = require("../controllers/csaControllers");
const router = express.Router();

//middleware --> JWT token check

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send("Not authorized");
  }

  const token = authHeader.split(" ")[1];

  if (token == null) {
    return res.status(403).send("JWT not found. Unauthorised");
  }

  const success = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!success) {
    return res.status(403).send("JWT incorrect. Unauthorised");
  } else {
    next();
  }
};

router.get("/", authentication, getData); //csa

router.get("/:id", authentication, getDataById); //csa/:id

router.post("/", authentication, postData); //csa

router.put("/:id", updateData); //csa/:id

router.delete("/:id", deleteData); //csa/:id

module.exports = router;

// Middlware, JWT,React optimization , 4-5 hooks, useRef, useCallback, useMemo, useReducer, useLayoutEffect, Custom Hooks
