const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router.post("/create/:uid", usersController.createUser);

router.get("/", usersController.getUsers);

router.get("/name/:uid", usersController.getName);

module.exports = router;
