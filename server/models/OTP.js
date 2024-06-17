const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:300,
  }
});

async function sendVerificationEmail(email,otp){
  try{
      const mailResponse=await mailSender(email,"verification mail from StudyNotion",otp);
      console.log("Email sent successfully");
  }
  catch(err){
    console.log("error at sending mail");
    console.log(err);
  }
}
OTPSchema.pre("save",async function(next){
  await sendVerificationEmail(this.email,this.otp);
  next();
})
module.exports = mongoose.model("OTP", OTPSchema);
