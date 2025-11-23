import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice'
import postSlice from './PostSlice'
import loopSlice from './LoopSlice'
import storySlice from './StorySlice'


const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        loop: loopSlice,
        story:storySlice
    }
})

export default store