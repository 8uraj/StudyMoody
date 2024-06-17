const mongoose=require("mongoose");
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mailSender");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  token:{
    type:String,

  },
  resetPasswordExpires:{
     type:Date,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"CourseProgress"
    },
  ],
});
async function sendRegistrationEmail(email) {
  try {
    const mailResponse = await mailSender(
      email,
      "StudyNotion ",
      "Registration successfull in studyNotion "
    );
    console.log("Email sent successfully");
  } catch (err) {
    console.log("error at sending mail");
    console.log(err);
  }
}
userSchema.post("save", async function (next) {
  await sendRegistrationEmail(this.email);
 
});
module.exports=mongoose.model("User",userSchema);