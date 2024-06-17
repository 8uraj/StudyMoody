const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const Category = require("../models/Category");

require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
const { convertSecondsToDuration } = require("../utils/setToDuration");
exports.createCourse = async (req, res) => {
  try {
    console.log("body is ",req.body);
    const {
      courseName,
      courseLanguage,
      benefits,
      courseDescription,
      courselevel,
      price,

      categoryId,
    } = req.body;
    
    const tag = JSON.parse(req.body.tag);
    const whatYouWillLearn = req.body.benefits;
    const thumbnail = req.files.thumbnail;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !categoryId ||
      !courselevel ||
      !courseLanguage
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;
    const details = await User.findById(userId);

    if (!details) {
      return res.status(200).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(200).json({
        success: false,
        message: "category not found / invalid category",
      });
    }

    // thumbnail image upload
    const thumbnailUpload = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // entry to new course
    const newcourse = await Course.create({
      courseName,
      courseDescription,
      Instructor: details._id,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailUpload.secure_url,
      tag,
      category: categoryId,
      courselevel,
      courseLanguage,
      benefits,
      status: "Draft",
    });

    // update courses of Instructor
    const upadatedInstructor = await User.findOneAndUpdate(
      { _id: details._id },
      { $push: { courses: newcourse._id } }
    );

    //update tags
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $push: { course: newcourse._id } }
    );

    return res.status(200).json({
      success: true,
      message: "Course Created successfully",
      data: newcourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in creating course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({})
      .populate("Instructor")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      allCourses: allCourses,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in getting all courses ",
    });
  }
};
exports.getInstructorCourses = async (req, res) => {
  try {
    const { InstructorId } = req.body;
    const allCourses = await Course.find({ Instructor: InstructorId })
      .populate("Instructor")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Instructor courses fetched successfully",
      allCourses: allCourses,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in getting Instructor courses ",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,

        message: "could not find course ",
      });
    }
    let progressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeduration = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeduration;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: courseDetails,
      totalDuration,
      completedVideos: progressCount?.completedVideos
        ? progressCount?.completedVideos
        : [],
      message: "course details fetched  successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting course details ",
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "course not found to delete ",
      });
    }

    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(
        { _id: studentId },
        { $pull: { courses: courseId } }
      );
    }

    const sections = course.courseContent;
    for (const sectionId of sections) {
      const sec = await Section.findById({ _id: sectionId });
      for (const subSectionId of sec.subSection) {
        await SubSection.findByIdAndDelete({ _id: subSectionId });
      }
      await Section.findOneAndDelete({ _id: sectionId });
    }
    await Course.findByIdAndDelete({ _id: courseId });
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in deleting course ",
    });
  }
};
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    console.log(updates);
    console.log("tags to edit are ", updates.tag);
    const course = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(200).json({
        success: false,
        message: "Course not found to update",
      });
    }
    if (req.files) {
      const thumbnail = req.files.thumbnail;
      const thumbnailurl = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailurl.secure_url;
    }
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        const value = updates[key];
        if (key === "tag") {
          try {
            course[key] = JSON.parse(value);
          } catch (error) {
            course[key] = null; // or some other appropriate default value
          }
        } else {
          course[key] = value;
        }
      }
    }

    await course.save();
    const updatedCourse = await Course.findById({ _id: courseId })
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in edit course",
    });
  }
};
