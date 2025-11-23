import { createSlice } from "@reduxjs/toolkit";

const loopSlice = createSlice({
    name: "loop",
    initialState: {
        loopData:[],
        
    },
    reducers: {
        setloopData: (state, action) => {
            state.loopData=action.payload
        },
        removeLoop: (state, action) => {
            state.loopData = state.loopData.filter((loop)=> loop._id != action.payload)
        }
       
    }
})

export const { setloopData,removeLoop} = loopSlice.actions
export default loopSlice.reducer
