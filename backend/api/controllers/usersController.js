const db = require("../../config/database");

const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    console.log("Creating a user...");
    let uid = req.params.uid;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;

    let user = new User(uid, firstname, lastname, email);
    await user.create();

    console.log("User created");

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [rows, fieldData] = await User.getAllUsers();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

exports.getName = async (req, res) => {
  try {
    let uid = req.params.uid;
    const [rows, fieldData] = await User.getName(uid);
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
