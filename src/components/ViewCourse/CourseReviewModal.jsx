import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import IconBtn from '../common/IconBtn';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseReviewModal({setreviewModal}) {
  const {user}=useSelector((state)=>state.profile);
  const { token } = useSelector((state) => state.auth);
  const {register,handleSubmit,setValue,formState:{errors},getValues}=useForm();
  const {courseId}=useParams();
  const onSubmit=async()=>{
    
        if(getValues("rating")==0){
          toast.error("Please Enter Rating");
          return;
        }
        try{
          var url = import.meta.env.VITE_REACT_APP_BASE_URL;
              const result = await axios.post(`${url}/createRating`, {
                rating: getValues("rating"),
                review: getValues("experience"),
                courseId: courseId,
                token
              });
              if(result.data.success){
                toast.success("Course Review submitted");
                setreviewModal(false);
              }
              else{
                toast.error(result.data.message);
              }
        }catch(err){
           console.log(err);
           toast.error("Error in giving review");
        }
        

        
  }
  const handleRatingChange=(newrating)=>{
     setValue("rating",newrating);
  }
 
  useEffect(()=>{
    setValue("experience","");
    setValue("rating",0);
  },[])
  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="bg-richblack-800 min-w-[350px] md:min-w-[400px] rounded-md ">
        <div className="flex justify-between  bg-richblack-700 p-2 ">
          <div className="font-semibold">Add Review</div>
          <button onClick={() => setreviewModal(false)}>X</button>
        </div>
        
          <div className="flex justify-center gap-x-3 p-2 items-center ">
            <div>

            <img
              src={user?.image}
              className="w-[80px] rounded-full m-auto"
            ></img>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-3 font-semibold">
                {user?.firstName} {"  "}
                {user?.lastName}
              </div>
              <div>Posting publicly</div>
            </div>
          </div>
       
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 pt-0 flex flex-col gap-y-0 ">
          <div className='mx-auto'>

          <ReactStars
            count={5}
            onChange={handleRatingChange}
            activeColor="#ffd700"
            size={35}
          />
          </div>
          <div className="flex flex-col gap-1">
            <label> Add your experience</label>
            <textarea
              id="experience"
              {...register("experience", { required: true })}
              className="bg-richblack-700 p-1 rounded-md min-h-[80px] "
              placeholder="Enter your Experience"
            ></textarea>
            {errors.experience && <span className='text-richblack-300' >Please add your experience </span>}
          </div>
          <div className='flex justify-end gap-x-3 my-2' >
            <IconBtn
              onClick={() => setreviewModal(false)}
              text="Cancel"
            ></IconBtn>
            <IconBtn text="save" active />
          </div>
        </form>
      </div>
    </div>
  );
}
