const express = require("express");
const router = express.Router();

const {addToCart,removeFromCart, getCartCourses}=require("../controllers/Cart");
const { auth, isStudent } = require("../middlewares/auth");

router.post("/cart/addtocart",auth,isStudent,addToCart);
router.post("/cart/removefromcart", auth, isStudent, removeFromCart);
router.post("/cart/getcartcourses", auth, isStudent, getCartCourses);

module.exports=router;