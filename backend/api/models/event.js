const db = require("../../config/database");

/**
 * Purpose: User model class
 */

module.exports = class Event {
  constructor(eventName, hostId, duration) {
    this.eventName = eventName;
    this.hostId = hostId;
    this.duration = duration;
  }

  // Returns the event_id (that is created by the database)
  async create() {
    let insertInfo = await db.execute(
      "INSERT INTO events (event_name, host_id, duration) VALUES (?, ?, ?)",
      [this.eventName, this.hostId, this.duration],
      (err, result) => {
        if (err) throw err;
      }
    );
    return insertInfo[0].insertId;
  }

  static async getAllEvents() {
    return await db.execute(
      "SELECT event_id, event_name, host_id, duration FROM events"
    );
  }

  static async getAllInvitedEventsWTotalParticipants(hostUid) {
    return await db.execute(
      "SELECT users.first_name, users.last_name, events.event_id, events.event_name, events.host_id, events.duration, COUNT(participants.uid) AS total_participants FROM events INNER JOIN participants ON events.event_id = participants.event_id INNER JOIN users ON events.host_id = users.uid WHERE events.host_id != ? GROUP BY events.event_id",
      [hostUid]
    );
  }

  static async getAllPersonalHostedEventsWTotalParticipants(hostUid) {
    return await db.execute(
      "SELECT users.first_name, users.last_name, events.event_id, events.event_name, events.host_id, events.duration, COUNT(participants.uid) AS total_participants FROM events INNER JOIN participants ON events.event_id = participants.event_id INNER JOIN users ON events.host_id = users.uid WHERE events.host_id = ? GROUP BY events.event_id",
      [hostUid]
    );
  }
};
