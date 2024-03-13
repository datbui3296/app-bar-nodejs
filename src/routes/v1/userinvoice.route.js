const express = require("express");
const UserNotifyController = require("../../controllers/userinvoice.controller");

const router = express.Router();

router.post("/create",  UserNotifyController.createUserInvoice);
router.patch("/update/:id", UserNotifyController.updateUserInvoice);
router.get("/getUserInvoices/:id",  UserNotifyController.getUserInvoiceId);
router.delete("/delete/:id",  UserNotifyController.deleteUserInvoice);
router.get("/UserInvoices/:page/:pageSize", UserNotifyController.getUserInvoices);
router.get("/UserInvoices", UserNotifyController.getAllUserInvoices);
router.post("/paidInvoice/:id", UserNotifyController.updateInvoidPaid);
router.get("/getInvoiceByCashier/:id", UserNotifyController.getListInvoicByCashier);


module.exports = router;