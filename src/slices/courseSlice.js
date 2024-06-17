import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  editCourse: false,
  editCourseInfo: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, value) => {
      state.step = value.payload;
    },
    seteditCourse: (state, value) => {
      state.editCourse = value.payload;
    },
    seteditCourseInfo: (state, value) => {
      state.editCourseInfo = value.payload;
    },
  },
});

export const { setStep, seteditCourse ,seteditCourseInfo} = courseSlice.actions;
export default courseSlice.reducer;
