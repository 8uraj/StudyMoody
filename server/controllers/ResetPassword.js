const User = require("../models/User");
const mailsender = require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Your email is not registered",
      });
    }

    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailsender(
      email,
      "Password reset link",
      `Password reset link : ${url}`
    );
    return res.status(500).json({
      success: true,
      message: "Check email and change password",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in sending reset password link",
    });
  }
};

exports.resetPassword=async (req,res)=>{

    try{
      const { password, confirmPassword, token } = req.body;
      if (password !== confirmPassword) {
        return res.status(500).json({
          success: false,
          message: "Password not matching",
        });
      }

      const userdetails = await User.findOne({ token: token });
      if (!userdetails) {
        return res.status(500).json({
          success: false,
          message: "Invalid token",
        });
      }
      if (userdetails.resetPasswordExpires < Date.now()) {
        return res.status(500).json({
          success: false,
          message: "Token is expired , Regenerate link",
        });
      }
      const hashedpass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { token: token },
        { password: hashedpass },
        { new: true }
      );
      return res.status(500).json({
        success: true,
        message: "Password Reset Successfull",
      });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error  in Resetting password",
        });
    }
}
