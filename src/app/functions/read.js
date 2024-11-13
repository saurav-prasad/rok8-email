import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const readSlice = createSlice({
    name: "favourite slice",
    initialState,
    reducers: {
        addToRead: (state, action) => {
            const isPresent = state.includes(action.payload)
            return isPresent ? state : [...state, action.payload]
        }
    }
})

export const { addToFavourite } = readSlice.actions
export default readSlice.reducer