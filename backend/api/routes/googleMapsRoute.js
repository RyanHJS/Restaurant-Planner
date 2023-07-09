const express = require("express");
const router = express.Router();

const googleMapsController = require("../controllers/googleMapsController");

router.get("/details/:placeId", googleMapsController.getPlaceDetails);

module.exports = router;
