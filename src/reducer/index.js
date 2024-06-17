import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewCourse from "../slices/viewCourse";
const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  cart:cartSlice,
  course:courseReducer,
  viewCourse:viewCourse
});
export default rootReducer;