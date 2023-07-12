const db = require("../../config/database");

exports.getAllEvents = async (req, res) => {
    try {
        const [rows] = await db.execute
            (
                "SELECT * FROM events"
            );
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getEvent = async (req, res) => {
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

exports.createEvent = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [insertInfo] = await db.execute(
            "INSERT INTO events (event_name, event_description) VALUES (?, ?)",
            [name, description]
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

exports.deleteEvent = async (req, res) => {
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

exports.getAllTables = async (req, res) => {
    try {
        const [rows] = await db.execute
            (
                "SHOW TABLES"
            );
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};