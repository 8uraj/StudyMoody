
const CourseProgress = require("../models/CourseProgress");
const SubSection=require("../models/SubSection");
exports.updateCourseProgress=async(req,res)=>{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;
    try{
          // check subsection is valid or not
          const subSection=await SubSection.findById({_id:subSectionId});
          if(!subSection){
             return res.status(200).json({
               success: false,
               message: "Lecture not found",
             });
          }
          let courseProgress=await CourseProgress.findOne({
              courseID:courseId,
              userId:userId
          });
          if(!courseProgress){
              return res.status(200).json({
                success: false,
                message: "courseProgress not found",
              });
          }
          if(courseProgress.completedVideos.includes(subSectionId)){
            return res.status(200).json({
              success: false,
              message: "Lecture is already completed",
            });
          }

           courseProgress.completedVideos.push(subSectionId);
           await courseProgress.save();
           return res.status(200).json({
             success: true,
             message: "Lecture marked completed",
           });
    }
    catch(err){
        return res.status(200).json({
            success:false,
            message:"error in updataCourseProgress"
        })
    }
}