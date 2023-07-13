const db = require("../../config/database");

const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    console.log("Creating an event...");
    let hostId = req.body.params;
    let eventName = req.body.eventName;
    let duration = req.body.duration;

    let event = new Event(eventName, hostId, duration);
    await event.create();

    // TODO: plus any other tables that will be populated.

    console.log("event created");

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    console.log("Getting all events...");
    const [rows, fieldData] = await Event.getAllEvents();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

exports.getInvitedEventsNTotalParticipants = async (req, res) => {
  try {
    let hostId = req.params.uid;
    const [rows, fieldData] = await Event.getAllInvitedEventsWTotalParticipants(
      hostId
    );

    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

exports.getHostedEventsNTotalParticipants = async (req, res) => {
  try {
    let hostId = req.params.uid;
    const [rows, fieldData] =
      await Event.getAllPersonalHostedEventsWTotalParticipants(hostId);
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
