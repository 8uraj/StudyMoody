import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  EntirecourseData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};
const viewCourse = createSlice({
  name: "viewCourse",
  initialState: initialState,
  reducers: {
    setcourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntirecourseData: (state, action) => {
      state.EntirecourseData = action.payload;
    },
    setcompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    settotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    updatecompletedLectures: (state, action) => {
     
      if (!Array.isArray(state.completedLectures)) {
        state.completedLectures = [];
      }
      state.completedLectures.push(action.payload);
    },
  },
});

export const {
  setcourseSectionData,
  setEntirecourseData,
  setcompletedLectures,
  settotalNoOfLectures,
  updatecompletedLectures,
} = viewCourse.actions;
export default viewCourse.reducer;
