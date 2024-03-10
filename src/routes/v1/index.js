
const express = require("express");
const authRoutes = require("./auth.route");
const categoryRoutes = require("./categories.route");
const articlrRoutes = require("./article.route");
const usernotifyRoutes = require("./usernotify.route");
const notifyTemplateRoutes = require("./notifytemplate.route");
const bookingRoutes = require("./booking.route");
const userInvoiceRoutes = require("./notifytemplate.route");
const notifySendPlanRoutes = require("./notifysendplan.router");
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
router.use("/article", articlrRoutes);
router.use("/usernotify", usernotifyRoutes);
router.use("/booking", bookingRoutes);
router.use("/userinvoice", userInvoiceRoutes);
router.use("/notifyTemplate", notifyTemplateRoutes);
router.use("/notifysendplan", notifySendPlanRoutes);

module.exports = router;
