import { configureStore } from '@reduxjs/toolkit'
import favouriteSlice from "./functions/favourite"
import readSlice from "./functions/read"

export default configureStore({
    reducer: {
        favouriteSlice,
        readSlice,
    }
})