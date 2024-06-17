const cloudinary=require("cloudinary").v2;

require("dotenv").config();

function cloudinaryConnect(){
    try{
          cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
          })
          console.log("cloudinary connection successfull");
    }
    catch(err){
        console.log("error in cloudinary connection");
        console.log(err);
    }
}
module.exports=cloudinaryConnect;