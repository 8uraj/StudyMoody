const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;
    const user = await User.findById({ _id: userId });
    const cartitems = user.cart;

    if (cartitems?.includes(courseId)) {
      return res.status(200).json({
        success: false,
        message: "Course already added to cart",
      });
    }
    const updatedCartUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: courseId } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course added to cart",
    });
  } catch (err) {
    console.log("Error in adding course in cart");
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in adding course in cart",
    });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;
    const user = await User.findById({ _id: userId });
    const cartitems = user.cart;
    console.log("cartitems",cartitems);
    console.log("id isssss ",courseId);
    if (!cartitems?.includes(courseId)) {
      return res.status(200).json({
        success: false,
        message: "Course not found in cart",
      });
    }
    const updatedCartUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { cart: courseId } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course removed from cart",
    });
  } catch (err) {
    console.log("Error in remvoing course from cart");
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in remvoing course from cart",
    });
  }
};
exports.getCartCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById({ _id: userId }).populate("cart").exec();
    const cartitems = user.cart;

    return res.status(200).json({
      success: true,
      cartCourses: cartitems,
      message: "successfully fetched cart courses",
    });
  } catch (err) {
    console.log("Error in getting courses in cart");
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting courses in cart",
    });
  }
};
