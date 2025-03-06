const express = require("express");
const router = express.Router();
const controller = require("../controllers/aep.controller");

router.get("/events", controller.getEvents);

module.exports = router;
