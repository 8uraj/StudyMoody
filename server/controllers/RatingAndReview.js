const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    // get user id
    const userId =  req.user.id;
    // get rating ,review ,course id
    const { rating, review, courseId } = req.body;
    console.log(userId,courseId);

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

     
     // check user is enrolled to this course or not

    if (courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

   
     
   

    // check if user has already rated this course or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(200).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // create rating
    const newrating = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    // update this rating in course model
    const updatedReviewcourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: newrating._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in creating rating",
    });
  }
};

// get Average rating
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const { courseId } = req.body;

    const avgRating = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (avgRating.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Average rating fetched successfully",
        averageRating: avgRating[0].averageRating,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully , No rating given",
      averageRating: 0,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting average rating",
    });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const result = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      }).populate({
        path:"course",select:"courseName"
      }).exec();
     
     
       return res.status(200).json({
         success: true,
         data:result,
         message: "All reviews fetched successfully",
       });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting all rating",
    });
  }
};
