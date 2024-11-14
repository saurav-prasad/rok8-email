import { createSlice } from "@reduxjs/toolkit"

const initialState = { favourites: false, read: false, unread: false }

const filterSlice = createSlice({
    name: "filter slice",
    initialState,
    reducers: {
        setFavourite: (state, action) => {
            return { ...state, favourites: action.payload }
        },
        setRead: (state, action) => {
            return {
                ...state,
                unread: false,
                read: action.payload
            }
        },
        setUnread: (state, action) => {
            return { ...state, read: false, unread: action.payload }
        },
    }
})

export const { setFavourite, setRead, setUnread } = filterSlice.actions
export default filterSlice.reducer