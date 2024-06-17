const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    const createdCategory = await Category.create({
      name: name,
      description: description,
    });
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in creating Category",
    });
  }
};
exports.showAllCategories = async (req, res) => {
  try {
   
    // console.log("called");
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    // console.log(allCategories);
     return res.status(200).json({
      success: true,
      data: allCategories,
      message: "All allCategories fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in fetching all allCategories server",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
   
    var { categoryId } = req.body;
    
    
    // get courses related with cetegoryid
    const selectedCategory = await Category.findById({_id:categoryId})
    .populate("course")
    .exec();
   
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Coursed with selected category not found",
      });
    }
    var diffCategoryCourses = await Category.find({
      _id: { $ne: categoryId },
    }).populate("course").exec();
       diffCategoryCourses=diffCategoryCourses.flatMap((crc)=>crc._id!==categoryId?crc.course:[]);
      const allCategories= await Category.find({}).populate({
        path:"course",
        populate:{
          path:"Instructor"
        }
      }).exec();
      const allcourses=allCategories.flatMap((category)=>category.course);
      const mostSellingCourses=allcourses.sort((a,b)=>b.sold-a.sold).slice(0,10);
      return res.status(200).json({
        success: true,
        data:{
          selectedCategory,
          diffCategoryCourses,
          mostSellingCourses
        },
        message: "courses fetched successfully ",
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in category page details ",
    });
  }
};
