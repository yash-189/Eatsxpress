import { createSlice } from "@reduxjs/toolkit";


export const favSlice = createSlice({
    name: 'fav',
    initialState: {
        items: []
    },
    reducers: {
        addToFav: (state, action) => {
            const newCart = state.items.filter(item => item.id == action.payload.id)
            if (newCart.length) return
            state.items = [...state.items, action.payload]

            return state
        },
        removeFromFav: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id)
            const data = [...state.items]

            if (index >= 0) {
                // console.warn(' removed', data, index, action.payload.id);

                data.splice(index, 1)
            } else {
                console.warn('not removed', data, index, action.payload.id);
            }
            state.items = data
        },
        resetfav: (state) => {
            state.items = []
        },
    }
})



export const { addToFav, removeFromFav } = favSlice.actions
export const selectFavItems = (state) => state.fav.items

export default favSlice.reducer