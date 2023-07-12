const db = require("../../config/database");
const express = require('express')
const router = express.Router();

const restaurants = [{name: "restaurant1", pid:1}, {name: "restaurant2", pid:2}, {name: "restaurant3", pid:3}];
const timeslots = ["timeslot1", "timeslot2", "timeslot3"];

router.get("/", (req, res) => {
    res.send("hello world");
    }
);

router.get("/place_votes/:place_candidates_id", async (req, res) => {
    const place_candidates_id = req.params.place_candidates_id;
    const sql = "SELECT uid FROM place_votes Where place_candidates_id = ?"
    const [row, fields] = await db.execute(sql, [place_candidates_id])
    let uids = [];
    row.forEach((record) => {
        uids.push(record.uid);
    })
    res.send(uids)
    }
);

router.get("/time_votes/:time_candidates_id", async (req, res) => {
    const time_candidates_id = req.params.time_candidates_id;
    const sql = "SELECT uid FROM time_votes Where time_candidates_id = ?"
    const [row, fields] = await db.execute(sql, [time_candidates_id])
    res.send(row)
    }
);

router.post("/", (req, res) => {
    console.log(req.body);
    let place_candidates_id = [];
    let time_candidates_id = [];
    if(req.body.place_candidates_id !== "undefined"){
        place_candidates_id = req.body.place_candidates_id;
    }
    if(req.body.time_candidates_id !== "undefined"){
        time_candidates_id = req.body.time_candidates_id;
    }
    place_candidates_id.forEach(async (id) => {   
        const sql = "INSERT INTO place_votes (place_candidates_id, uid) VALUES (?, ?)"
        await db.execute(sql, [id, req.body.uid])
    })
    time_candidates_id.forEach(async (id) => {   
        const sql = "INSERT INTO time_votes (time_candidates_id, uid) VALUES (?, ?)"
        await db.execute(sql, [id, req.body.uid])
    })
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

router.get("/place_candidates/:event_id", async (req, res) => {
    const eventId = req.params.event_id;
    const sql = "SELECT place_candidates_id, P.place_id, name FROM place_candidates P, restaurants R Where event_id = ? AND P.place_id = R.place_id";
    const [row, fields] = await db.execute(sql, [eventId])
    res.send(row)
    }
);

router.get("/time_candidates/:event_id", async (req, res) => {
    //Retrieve list of timeslot from database
    const eventId = req.params.event_id;
    const sql = "SELECT time_candidates_id, timeslot FROM time_candidates Where event_id = ?"
    const [row, fields] = await db.execute(sql, [eventId])
    res.send(row)
    }
);

router.get("/count_place_votes/:place_candidates_id", async (req, res) => {
    const place_candidates_id = req.params.place_candidates_id;
    const sql = "SELECT COUNT(*) AS numVotes FROM place_votes Where place_candidates_id = ?"
    const [row, fields] = await db.execute(sql, [place_candidates_id])
    // console.log(row);
    res.send(row[0])
    }
);

router.get("/count_time_votes/:time_candidates_id", async (req, res) => {
    const time_candidates_id = req.params.time_candidates_id;
    const sql = "SELECT COUNT(*) AS numVotes FROM time_votes Where time_candidates_id = ?"
    const [row, fields] = await db.execute(sql, [time_candidates_id])
    res.send(row)
    }
);


module.exports = router;
