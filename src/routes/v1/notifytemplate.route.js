const express = require("express");
const NotifyTemplateController = require("../../controllers/notifytemplete.controller");

const router = express.Router();

router.post("/create",  NotifyTemplateController.createNotifyTemplate);
router.patch("/update/:id", NotifyTemplateController.updateNotifyTemplate);
router.get("/getUserNotifies/:id",  NotifyTemplateController.getNotifyTemplateById);
router.delete("/delete/:id",  NotifyTemplateController.deleteNotifyTemplate);
router.get("/UserNotifies/:page/:pageSize", NotifyTemplateController.getNotifyTemplates);
router.get("/UserNotifies", NotifyTemplateController.getAllNotifyTemplates);



module.exports = router;