
const express = require("express");
const authRoutes = require("./auth.route");
const categoryRoutes = require("./categories.route");
const HttpStatusCode = require("../../utilities/constants");


const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK!" })
);

/** Auth APIs */
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
