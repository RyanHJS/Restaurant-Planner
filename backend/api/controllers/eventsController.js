const db = require("../../config/database");

const Event = require("../models/event");

// exports.createEvent = async (req, res) => {
//   try {
//     console.log("Creating an event...");
//     let hostId = req.body.params;
//     let eventName = req.body.eventName;
//     let duration = req.body.duration;

//     let event = new Event(eventName, hostId, duration);
//     await event.create();

//     // TODO: plus any other tables that will be populated.

//     console.log("event created");

//     res.sendStatus(201);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(400);
//   }
// };


exports.createEvent = async (req, res) => {

    try {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const { name, description, host_id, duration } = req.body;
        const durationValue = duration !== undefined ? duration : 60; // Use a default value if duration is not provided

        const [insertInfo] = await db.execute(
            "INSERT INTO events (event_name, event_description, host_id, duration) VALUES (?, ?, ?, ?)",
            [name, description, host_id, durationValue]
        );

        // Get the ID of the inserted event
        const insertId = insertInfo.insertId;

        // Fetch the event that was just inserted
        const [rows] = await db.execute(
            "SELECT * FROM events WHERE event_id = ?",
            [insertId]
        );

        // If the inserted event was found, send it back to the client
        if (rows.length > 0) {
            const event = rows[0];
            res.send(event);
        } else {
            throw new Error('Event was not found after insertion');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
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


exports.deleteEventByID = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute(
            "DELETE FROM events WHERE event_id = ?",
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            throw new Error('Event not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.getEventsByUserID = async (req, res) => {
    try {
        const uid = req.params.uid;

        const [rows] = await db.execute
            (
                "SELECT * FROM events WHERE host_id = ?", [uid]
            );
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.getEventByID = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute
            (
                "SELECT * FROM events WHERE event_id = ?", [id]
            );
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
