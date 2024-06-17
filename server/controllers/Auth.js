const mongoose = require("mongoose");
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.sendOTP = async (req, res) => {
  try {
   

    const {email} = req.body;
    


    if(!email){
       return res.status(200).json({
         success: false,
         message: "email not found",
       });
    }
    const already_exist = await User.findOne({email:email});
    
    if (already_exist) {
      return res.status(200).json({
        success: false,
        message: "user already exist",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp is ", otp);
    var result = await OTP.findOne({ otp: otp });
    // while (result) {
    //   otp = otpGenerator.generate(6, {
    //     upperCaseAlphabets: false,
    //     lowerCaseAlphabets: false,
    //     specialChars: false,
    //   });
    //   result = await OTP.findOne({ otp: otp });
    // }

    const payload = { email, otp };
    const addpayload = OTP.create(payload);
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "otp sent unsuccessfull",
    });
  }
};

exports.signup = async (req, res) => {
  // fetch data
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      
      !otp
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }
    const already_exist = await User.findOne({ email: email });
    if (already_exist) {
      return res.status(200).json({
        success: false,
        message: "User already exist",
      });
    }
    const recentotp = await OTP.find({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (recentotp.length == 0) {
      return res.status(200).json({
        success: false,
        message: "otp is not valid",
      });
    } else if (otp != recentotp[0].otp) {
      console.log(otp,recentotp[0].otp);
      return res.status(200).json({
        success: false,
        message: "Otp doesnt match",
      });
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    
    const user = await User.create({
      firstName,
      lastName,
      email:email,
      password: hashedpass,

      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      message: "user registerd successfully",
      user:user,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "user not registerd ",
    });
  }
};
exports.login = async (req, res) => {
  try{
    // fetch data
    const {email,password}=req.body;
    if(!email || !password ){
      return res.status(200).json({
        success: false,
        message: "All fields are compulsary",
      });
    }
    const user=await User.findOne({email:email}).populate("additionalDetails");
    if(!user){
      return res.status(200).json({
        success: false,
        message: "user not found",
      });
    }
    if(bcrypt.compareSync(password,user.password)){
        const payload={
          email:user.email,
          id:user._id,
          accountType:user.accountType,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        user.token=token;
        user.password=undefined;
        const options={
          expires:new Date(Date.now()+ 3*24*60*60*1000),
          httpOnly:true,
          secure:true,
          sameSite:'none',
        }
        res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
        })
    }
    else{
      return res.status(200).json({
        success: false,
        message: "Incorrect password",
      });
    }


  }
  catch(err){
    console.log(err);
    return res.status(200).json({
      success: true,
      message: "Login unsuccessfull",
    });
  }
};

exports.changePassword=async(req,res)=>{
     try{
       const {password,confirmPassword,email}=req.body;
       if(password!==confirmPassword){
         return res.status(200).json({
           success: false,
           message: "Password doesnt match",
         });
       }
       const user=await User.findOne({email:email});
       if(!user){
         return res.status(200).json({
           success: false,
           message: "User not found while changepassword",
         });
       }
       // hash password 
       const hashedpass=await bcrypt.hash(password,10);
       await User.findOneAndUpdate({email:email},{password:hashedpass});
        return res.status(200).json({
          success: true,
          message: "password changed successfully",
        });
     }
     catch(err){
      console.log(err);
       return res.status(200).json({
         success: false,
         message: "Error in changePassword",
       });
     }
}
