import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set, update } from "firebase/database";


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

            const auth = getAuth()
            const db = getDatabase();


            const favRef = ref(db, 'users/' + auth.currentUser.uid + '/favorite');
            const favData = action.payload

            const newItemRef = push(favRef);
            set(newItemRef,
                favData
            );

            return state
        },


        removeFromFav: (state, action) => {


            const index = state.items.findIndex((item) => item.id === action.payload.id)
            const data = [...state.items]

            if (index >= 0) {
                // console.warn(' removed', data, index, action.payload.id);
                
                // updating firebase database
               
                data.splice(index, 1)

                

            } else {
                console.warn('not removed', data, index, action.payload.id);
            }
            state.items = data

            const auth = getAuth()
                const db = getDatabase();

                const favRef = ref(db, 'users/' + auth.currentUser.uid);
                const Data = Object.assign({}, state.items)
                    update(favRef, { favorite: Data })
        },
        getFav: (state, action) => {
           
            state.items = [...action.payload]


        },

        resetfav: (state) => {
            state.items = []
        },
    }
})



export const { addToFav, removeFromFav,getFav } = favSlice.actions
export const selectFavItems = (state) => state.fav.items
export const selectFavItemsWithId = (state, id) => state.fav.items.filter((item) => item.id === id)

export default favSlice.reducer