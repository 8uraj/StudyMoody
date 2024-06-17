const express=require("express");
const {
  sendOTP,
  signup,
  login,
  changePassword,
} = require("../controllers/Auth");

const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");
const router=express.Router();

router.post("/login",login);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.post("/signup",signup);
router.post("/sendOTP", sendOTP);
router.post("/changePassword",auth,changePassword);

module.exports=router;