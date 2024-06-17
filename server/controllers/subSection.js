const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
exports.createSubSection = async (req, res) => {
  try {
    const {
      title,
      
      courseId,
      description,
      sectionId,
    } = req.body;
    const video = req.files.video;

    if (!title || !description || !sectionId || !video) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    // uploading video
    const uploadedVideo = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    const timeDuration=uploadedVideo.duration;
    console.log("duration ",timeDuration);
    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadedVideo.secure_url,
    });
    // adding subsection to section
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate();
    const updatedCourse = await Course.findById({ _id: courseId })
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
      updateSection,
      course: updatedCourse,
      message: "Subsection created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in creating subsection",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const {
      title,
     
      courseId,
      description,
      subSectionId,
    } = req.body;

    var subSection=await SubSection.findById({_id:subSectionId});
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }
        if (title !== undefined) {
          subSection.title = title;
        }

        if (description !== undefined) {
          subSection.description = description;
        }

   if (req.files && req.files.video !== undefined) {
     const video = req.files.video;
     const uploadDetails = await uploadImageToCloudinary(
       video,
       process.env.FOLDER_NAME
     );
     subSection.videoUrl = uploadDetails.secure_url;
     subSection.timeDuration = `${uploadDetails.duration}`;
   }

   await subSection.save();
    const updatedCourse = await Course.findById({ _id: courseId })
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
      course: updatedCourse,
      message: " subsection updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in updating subsection",
    });
  }
};
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, courseId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const removeSubSection = await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });
    const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);
    const updatedCourse = await Course.findById({ _id: courseId })
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
      course: updatedCourse,
      message: " subsection deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in deleting subsection",
    });
  }
};
