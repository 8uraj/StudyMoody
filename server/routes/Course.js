const express=require("express");
const router=express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");
const{createRating,getAverageRating,getAllRatings}=require("../controllers/RatingAndReview");
const {auth,isStudent,isInstructor,isAdmin}=require("../middlewares/auth");
const {createSection,updateSection,deleteSection}=require("../controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/subSection");
const {createCategory,showAllCategories,categoryPageDetails}=require("../controllers/Category");
const {updateCourseProgress}=require("../controllers/CourseProgress");

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/editCourse", editCourse);
router.post("/deleteCourse", deleteCourse);
router.post("/getInstructorCourses", getInstructorCourses);
router.post("/getCourseDetails", getCourseDetails);

router.post("/createRating", auth, isStudent, createRating);
router.post("/getAverageRating", auth, getAverageRating);
router.get("/getAllRatings", getAllRatings);

// section routes
router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
// subsection routes
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);

//courseprogress routes
router.post("/updateCourseProgress", auth,isStudent,updateCourseProgress);

module.exports=router;

