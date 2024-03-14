const express = require("express");
const BookkingController = require("../../controllers/booking.controller");

const router = express.Router();

router.post("/create",  BookkingController.createUserBooking);
router.patch("/update/:id", BookkingController.updateUserBooking);
router.delete("/delete/:id",  BookkingController.deleteUserBooking);
router.post("/vertify/:id", BookkingController.vertifyUserBooking);
router.get("/bookingStatusAndSale/:status/:saleId", BookkingController.getBookingByStatuAndSale);
router.put("/updateBookingStatusAndSale/:id/:status", BookkingController.updateBookingStatusById);



module.exports = router;