import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const favouriteSlice = createSlice({
    name: "favourite slice",
    initialState,
    reducers: {
        addToFavourite: (state, action) => {
            const isPresent = state.includes(action.payload)
            return isPresent ? state : [...state, action.payload]
        },
        removeFromFavourite: (state, action) => {
            const filteredArr = state.filter((e) => e !== action.payload)
            return filteredArr
        },
    }
})

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions
export default favouriteSlice.reducer