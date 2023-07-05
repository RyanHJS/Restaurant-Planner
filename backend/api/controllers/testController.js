
const db = require('../../config/database')

exports.getNothing = async (req, res) => {
// try {
// db.}
    try {
        const [row, fields] = await db.execute("SELECT * FROM test");
        res.send(row);
    } catch (err) {
        console.error(err)
        res.send("database call not working");
    }
}