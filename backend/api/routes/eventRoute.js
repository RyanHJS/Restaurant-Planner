const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router.get("/api/events", eventController.getAllEvents);
router.get("/api/events/:id", eventController.getEvent);
router.post("/api/events", eventController.createEvent);
router.delete("/api/events/:id", eventController.deleteEvent);
router.get("/api/getalltables", eventController.getAllTables);

module.exports = router;