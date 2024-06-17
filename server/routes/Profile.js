const express = require("express");
const router = express.Router();
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
  
} = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getAllDetails,
  getEnrolledCourses,
  updateProfilePicture,
  instructorDashboardData,
} = require("../controllers/Profile");

router.post("/profile/updateProfile",auth, updateProfile);
router.post("/profile/instructorDashboardData", auth, isInstructor, instructorDashboardData);
router.post("/profile/getAllDetails", auth, getAllDetails);
router.post("/profile/deleteAccount", auth,  deleteAccount);

router.post("/profile/updateProfilePicture", auth, updateProfilePicture);


router.post("/profile/getEnrolledCourses", auth, isStudent, getEnrolledCourses);


module.exports=router;