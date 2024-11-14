import { configureStore } from '@reduxjs/toolkit'
import favouriteSlice from "./functions/favourite"
import readSlice from "./functions/read"
import filterSlice from "./functions/filter"

export default configureStore({
    reducer: {
        favouriteSlice,
        readSlice,
        filterSlice
    }
})