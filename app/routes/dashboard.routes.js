const express = require("express");
const router = express.Router();
const dashboardMethod = require("../controllers/Dashboard.controller");

//dashboard
router.get("/dashboard", dashboardMethod.displayDashboard);

module.exports = router;
