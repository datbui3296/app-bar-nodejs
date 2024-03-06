const express = require("express");
const UserNotifyController = require("../../controllers/usernotify.controller");

const router = express.Router();

router.post("/create",  UserNotifyController.createUserNotify);
router.patch("/update/:id", UserNotifyController.updateUserNotify);
router.get("/getUserNotifies/:id",  UserNotifyController.getUserNotifyById);
router.delete("/delete/:id",  UserNotifyController.deleteUserNotify);
router.get("/UserNotifies/:page/:pageSize", UserNotifyController.getUserNotifies);
router.get("/UserNotifies", UserNotifyController.getAllUserNotifies);


module.exports = router;