import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const readSlice = createSlice({
    name: "read slice",
    initialState,
    reducers: {
        addToRead: (state, action) => {
            const isPresent = state.includes(action.payload)
            // console.log(isPresent)
            return isPresent ? [...state] : [...state, action.payload]
        }
    }
})

export const { addToRead } = readSlice.actions
export default readSlice.reducer