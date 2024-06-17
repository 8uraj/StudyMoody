import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCourse from "./CartCourse";
import { getCartCourses } from "../../services/operations/getCartCourses";
import Button from "../Homepage/Button";
import { buyCourse } from "../../services/operations/studentFeaturesAPI";

import toast from "react-hot-toast";
export default function Cart() {
  const dispatch = useDispatch();
  const{totalItems}=useSelector((state)=>state.cart);
  const navigate = useNavigate();
  
  const [cart,setcart]=useState([]);
  const {user}=useSelector((state)=>state.profile);
  const { token } = useSelector((state) => state.auth);
  const [totalprice,settotalprice]=useState(0);
  
  useEffect(()=>{
    (async()=>{
      const result = await getCartCourses(token, dispatch);
        console.log(result);
          setcart(result.data.cartCourses);
          var pricesum=0;
          for(var i=0;i<result?.data?.cartCourses?.length;i++){
            pricesum+=result.data.cartCourses[i].price;
          }
          settotalprice(pricesum);
         
         
    })()
    
  },[])
   const handleBuyCartCourses=async()=>{
    
    
     if (token !== null) {
      try{
           if (user.accountType !== "Student") {
         toast.error("Only students can buy courses");
         return;
       }
       const courses=cart.map((course)=>course._id);
        
        await buyCourse(token, courses, user, navigate, dispatch)
        
        
      }
      catch(err){
        console.log(err);
        console.log("Error in buying cart items");
        toast.error("Error in buying cart items");
      }
       
       

       
     } else {
       toast.error("You are not logged in ");
     }
   }

  return (
    <div className="text-white">
      <div className="text-[2rem] font-semibold">My cart</div>
      <div className="border-b-[1px] border-b-richblack-600 mt-16 mb-12 p-2 text-richblack-100 font-semibold ">
        {cart?.length} Courses in cart
      </div>
      {cart?.length === 0 ? (
        <div className="text-[1.4rem] font-semibold">Cart is empty</div>
      ) : (
        <div className="flex flex-wrap   ">
          {/* cart courses */}
          <div className="flex flex-col gap-4 max-w-[750px] ">
            {cart?.map((course, index) => {
              return (
                <CartCourse
                  totalprice={totalprice}
                  settotalprice={settotalprice}
                  course={course}
                  key={index}
                />
              );
            })}
          </div>
          {/* checkout page */}

          <div className="bg-richblack-800 my-8 md:my-0  rounded-md w-full max-w-[300px] mx-auto h-fit p-4 flex flex-col  gap-1 py-8">
            <div className="text-[1.2rem] font-semibold">Total</div>
            <div className="text-yellow-50 text-[2rem] font-semibold  ">
              Rs. {totalprice}
            </div>
            <button
              className="w-full bg-yellow-50 hover:scale-95  text-black  transition-all duration-300 text-center text-[15px] px-2 md:px-6 py-3  rounded-md font-bold"
              onClick={handleBuyCartCourses}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
