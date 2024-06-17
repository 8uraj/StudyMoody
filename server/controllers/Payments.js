const mongoose = require("mongoose");

const { ObjectId } = require("mongodb");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");
// initiate order payment
exports.capturePayment = async (req, res) => {
  let totalAmount = 0;
  try {
    const { courses } = req.body;
   

    const userId = req.user.id;
    
    if (courses.length === 0) {
      return res.json({
        success: false,
        message: "provide course id",
      });
    }
    
    for (const courseId of courses) {
      
      let course;
      try {
        course = await Course.findById({ _id: courseId });
        // console.log("oo ",course);
        if (!course) {
           
          
          return res.json({
            success: false,
            message: "Course not found",
          });
        }
        // const uid = new mongoose.Types.ObjectId(userId);
        if (course?.studentsEnrolled?.includes(userId)) {
          return res.json({
            success: false,
            message: "You have already bougth this course",
          });
        }
        totalAmount += course.price;
      } catch (err) {
        // console.log(err);
        return res.json({
          success: false,
          message: "Error in finding course",
        });
      }
    }
  } catch (err) {
    // console.log("error is : ",err);
    return res.json({
      success: false,
      message: "Error in capture payment",
    });
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    return res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "could not initiate order",
    });
  }
};

// verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.bodyData?.razorpay_order_id;
    const razorpay_payment_id = req.body?.bodyData?.razorpay_payment_id;
    const razorpay_signature = req.body?.bodyData?.razorpay_signature;
    const courses = req.body?.bodyData.courses;
   
    const userId = req.user.id;
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.json({
        success: false,
        message: "Payment failed",
      });
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res);
      return res.status(200).json({
        success: true,
        message: "payment verified",
      });
    }
    return res.status(200).json({
      success: false,
      message: "payment failed",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "payment failed",
    });
  }
};

const enrollStudents = async (courses, userId, res) => {
  

  if (!courses || !userId) {
    return res.status(200).json({
      success: false,
      message: "Enter courses and userId",
    });
  }
  try {
    for (const courseId of courses) {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: courseId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(200).json({
          success: false,
          message: "Course not found",
        });
      }
        const courseProgress=await CourseProgress.create({
          courseID:courseId,
          userId:userId,
          completedVideos:[]
        });
      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseId,courseProgress:courseProgress._id } },
        { new: true }
      );
      const removeFromCart = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { cart: courseId } },
        { new: true }
      );
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        "<h1>enrolled successfully</h1>"
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Erroe in enroll student",
    });
  }
};

exports.sendPaymentSuccessEmail=async(req,res)=>{

  const {orderId,paymentId,amount}=req.body;
  const userId=req.user.id;

  if(!orderId || !paymentId || !amount){
    return res.status(200).json({
      success: false,
      message: "all fields reqired in sendpayment email",
    });

  }
  try{
    const enrolledStudent=await User.findById({_id:userId});
    console.log(enrolledStudent);
    await mailSender(enrolledStudent.email,`Payment received ${amount/100} `,"<h1>payment successfull</h1>")
  }
  catch(err){
    return res.status(200).json({
      success: false,
      message: "error in sending mail of successful payment",
    });
      console.log("error in sending mail");
      console.log(err);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// exports.capturePayment = async (req, res) => {
//   // getids
//   const { courseId } = req.body;
//   const userId = req.user.id;
//   if (!courseId) {
//     return res.status(200).json({
//       success: false,
//       message: "Enter valid course id",
//     });
//   }
//   let course;
//   try {
//     course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(200).json({
//         success: false,
//         message: "course not found",
//       });
//     }
//     // const uid=new mongoose.Types.ObjectId(userId);
//     const uid = new ObjectId(userId);

//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json({
//       success: false,
//       message: "error in capture Payments",
//     });
//   }
//   const amount = course.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: courseId,
//       userId,
//     },
//   };
//   try {
//     // creating order
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json({
//       success: false,
//       message: "Error in creating order",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "1222323";
//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");
//   if (signature === digest) {
//     console.log("payment is authorised");
//     const { courseId, userId } = req.body.payload.payment.notes;
//     try {
//       // update course
//       const enrolledcourse = await Course.findByIdAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );
//       if (!enrolledcourse) {
//         return res.status(200).json({
//           success: false,
//           message: "course not found // update not possible",
//         });
//       }

//       // add course to students info
//       const enrolledstudent = await User.findByIdAndUpdate(
//         { _id: userId },
//         { $push: { courses: courseId } },
//         { new: true }
//       );
//       if (!enrolledstudent) {
//         return res.status(200).json({
//           success: false,
//           message: "error in adding course to student",
//         });
//       }

//       // send mail
//       const emailResponse = await mailSender(
//         enrolledstudent.email,
//         "congratulations from studynotion ",
//         "You are enrolled a new course"
//       );
//       console.log(emailResponse);
//       return res.status(200).json({
//         success: true,
//         message: "student enrolled successfully",
//       });
//     } catch (err) {
//         console.log(err);
//       return res.status(200).json({
//         success: false,
//         message: "student enroll failed",
//       });
//     }
//   }
// };
