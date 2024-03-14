const express = require("express");
const AuthController = require("../../controllers/auth.controller");
const AuthValidation = require("../../validations/auth.validation");
const AuthServive = require("../../services/auth.service");
// const authMiddleware = require("../../middlewares/auth.middleware");
// const UploadMiddleware = require("/../middlewares/upload.middleware");

const router = express.Router();
router.post("/register", AuthValidation.register, AuthController.register);
router.post("/login", AuthValidation.login, AuthController.login);
router.get("/getById/:id", AuthServive.authMiddleWare, AuthController.getUserById);
router.post("/refreshToken", AuthController.refreshToken);
router.post("/forgotPassword", AuthController.forgotPassword);
router.put("/resetPassword/:id", AuthController.resetPassword);
router.patch("/update/:id", AuthController.update);
router.get("/rank/:id", AuthController.getLevelByLevelId);
router.get("/getUserByToken/:token", AuthController.getUserByToken);
router.post("/createUserAndBooking", AuthController.createUserAndBooking);
router.get("/getUserPercentageBySaleId/:id", AuthController.getUserPercentageByUserSale);
router.put("/takePercentageUserSale/:id", AuthController.getUserTakePercentageByUserSale);

// router.route('/refreshToken')
//     .get(authMiddleware.isRefreshToken, AuthController.refreshToken)



router
  .route("/verify/:email/:verifyToken")
  .post(AuthValidation.verify, AuthController.verify);

// router.route('/logout')
//     .delete(authMiddleware.deleteToken, AuthController.logout)

// router.route('/refreshToken')
//     .get(authMiddleware.isRefreshToken, AuthController.refreshToken)

// router.route('/update/:id')
//     .put(AuthValidation.update, AuthController.update)

// router.route('/update')
//     .put(authMiddleware.isAuthorized, UploadMiddleware.upload.single('avatar'), AuthValidation.update, AuthController.update)

module.exports = router;
