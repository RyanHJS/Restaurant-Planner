const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router.post("/create/:uid", usersController.createUser);

router.get("/", usersController.getUsers);

module.exports = router;
