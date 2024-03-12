const express = require("express");
const notifySendplanController = require("../../controllers/notifysendplan.controller");

const router = express.Router();

router.post("/create",  notifySendplanController.createNotifySendPlan);
router.patch("/update/:id", notifySendplanController.updateNotifySendPlan);
router.get("/detail/:id",  notifySendplanController.getNotifySendPlanById);
router.delete("/delete/:id",  notifySendplanController.deleteNotifySendPlan);
router.get("/list/:page/:pageSize", notifySendplanController.getNotifySendPlans);
router.get("/listAll", notifySendplanController.getAllNotifySendPlans);
router.get("/list/:userId", notifySendplanController.getUNotifySendPlanByNotifyId);


module.exports = router;