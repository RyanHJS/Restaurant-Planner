const db = require("../../config/database");

/**
 * Purpose: User model class
 */

module.exports = class User {
  constructor(uid, firstname, lastname, email) {
    this.uid = uid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  async create() {
    let insertInfo = await db.execute(
      "INSERT INTO users (uid, firstname, lastname, email) VALUES (?, ?, ?, ?)",
      [this.uid, this.firstname, this.lastname, this.email],
      (err, result) => {
        if (err) throw err;
      }
    );
    // return insertInfo[0].insertId;
  }

  static async getAllUsers() {
    return await db.execute(
      "SELECT uid, firstname, lastname, email FROM users"
    );
  }

  // static async getAllEventsByHostUid(hostUid) {
  //   return await db.execute(
  //     "SELECT event_id, event_name, firstname, lastname FROM events INNER JOIN users ON events.host_uid = users.uid WHERE users.uid = ?",
  //     [hostUid]
  //   );
  // }
};
