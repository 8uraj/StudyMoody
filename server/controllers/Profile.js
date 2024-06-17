const { useSelector } = require("react-redux");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const {convertSecondsToDuration} = require("../utils/setToDuration");
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender } = req.body.info;
    console.log(req.body.info);
    const id = req.user.id;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById({ _id: id });
    const profileId = user.additionalDetails;
    const profileDetails = await Profile.findById({ _id: profileId });
    console.log(profileDetails);
    if (dateOfBirth) profileDetails.dateOfBirth = dateOfBirth;
    if (about) profileDetails.about = about;
    if (gender) profileDetails.gender = gender;
    if (contactNumber) profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    console.log(profileDetails);
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in update profile",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found to delete account",
      });
    }

    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    await User.findOneAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Account Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in deleting user account",
    });
  }
};

exports.getAllDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate("additionalDetails");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found ",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting user profile details",
    });
  }
};
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })

      .exec();
    userDetails = userDetails.toObject();
    var subSectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      subSectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        subSectionLength+=userDetails.courses[i].courseContent[j].subSection.length;
      }
      console.log(userDetails.courses[i]._id);
      let courseProgressCount=await CourseProgress.findOne({
        courseID:userDetails.courses[i]._id,
        userId:userId
      })
     
      courseProgressCount=courseProgressCount.completedVideos.length;
      if(subSectionLength===0){
        userDetails.courses[i].progressPercentage=100;
      }
      else{
        const multiplier=Math.pow(10,2);
        userDetails.courses[i].progressPercentage=Math.round((courseProgressCount/subSectionLength)*100*multiplier)/multiplier
      }
    }
    if(!userDetails){
       return res.status(200).json({
         success: false,
         
         message: "User not found",
       });
    }
    return res.status(200).json({
      success: true,
      courses: userDetails?.courses,
      message: "All enrolled courses fetched successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting enrolled courses details ",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    // take image and userid
    const image = req.files.imageFile;
    const userId = req.user.id;
    if (!image) {
      return res.status(200).json({
        success: false,

        message: " Image not found",
      });
    }
    if (!userId) {
      return res.status(200).json({
        success: false,

        message: "User id not found",
      });
    }
    // upload image to cloudinary
    const result = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    // update profile url
    const updatedprofile = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { image: result?.secure_url } },
      { new: true }
    );
    return res.status(200).json({
      success: true,

      message: " profile picture updated successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("Error in updating profile picture");
    return res.status(200).json({
      success: false,

      message: "Error in updating profile picture",
    });
  }
};

exports.instructorDashboardData=async(req,res)=>{


  try{
     const userId=req.user.id;
     const courses=await Course.find({Instructor:userId});
     const courseData= courses.map((course)=>{
      
          const totalStudentsEnrolled = course.studentsEnrolled.length;
          const totalAmountGenerated=totalStudentsEnrolled*course.price;

          const courseWithStats = {
            _id: course._id,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            totalStudentsEnrolled,
            totalAmountGenerated,
          };
          return courseWithStats;
     })
      return res.status(200).json({
        success: true,
        data:courseData,
        message: "courseData fetched successfully",
      });
  }
  catch(err){
    console.log(err);
    return res.status(200).json({
      success: false,

      message: "Internal server error",
    });
  }
}