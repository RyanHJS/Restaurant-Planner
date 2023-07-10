const db = require("../../config/database");
const express = require('express')
const router = express.Router();

const restaurants = [{name: "restaurant1", pid:1}, {name: "restaurant2", pid:2}, {name: "restaurant3", pid:3}];
const timeslots = ["timeslot1", "timeslot2", "timeslot3"];

router.get("/", (req, res) => {
    res.send("hello world");
    }
);

router.post("/", (req, res) => {
    console.log(req.body);
    }
);

router.get("/place_candidates", (req, res) => {
    //Retrieve list of restaurants from database
    res.send(restaurants);
    }
);

router.get("/time_candidates", (req, res) => {
    //Retrieve list of timeslot from database
    res.send(timeslots);
    }
);

module.exports = router;
