import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: null,  
  },
  reducers: {
    setstoryData: (state, action) => {
      state.storyData = action.payload; 
    },
    removestory: (state) => {
      state.storyData = null;  
    }
  }
});

export const { setstoryData, removestory } = storySlice.actions;
export default storySlice.reducer;
