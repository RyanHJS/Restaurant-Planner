const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/eventsController");

router.post("/create/:uid", eventsController.createEvent);

router.get("/list", eventsController.getAllEvents);
router.get(
  "/list/invited/:uid",
  eventsController.getInvitedEventsNTotalParticipants
);

router.get(
  "/list/hosted/:uid",
  eventsController.getHostedEventsNTotalParticipants
);


router.get("", eventsController.getAllEvents);
router.get("/:id", eventsController.getEventByID);
router.post("", eventsController.createEvent);
router.delete("/:id", eventsController.deleteEventByID);
router.get("/:uid", eventsController.getEventsByUserID);


module.exports = router;
