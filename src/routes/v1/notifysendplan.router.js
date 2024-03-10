const express = require("express");
const notifySendplanController = require("../../controllers/notifysendplan.controller");

const router = express.Router();

router.post("/create",  notifySendplanController.createNotifySendPlan);
router.patch("/update/:id", notifySendplanController.updateNotifySendPlan);
router.get("/getNotifySendPlans/:id",  notifySendplanController.getNotifySendPlanById);
router.delete("/delete/:id",  notifySendplanController.deleteNotifySendPlan);
router.get("/NotifySendPlans/:page/:pageSize", notifySendplanController.getNotifySendPlans);
router.get("/NotifySendPlans", notifySendplanController.getAllNotifySendPlans);
router.get("/getNotifySendPlanByTemplateId/:userId", notifySendplanController.getUNotifySendPlanByNotifyId);


module.exports = router;