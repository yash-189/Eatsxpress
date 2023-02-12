import { useNavigation } from "@react-navigation/native";
import { createSlice } from "@reduxjs/toolkit";



export const locationSlice = createSlice({


    
    name: 'location',
    initialState: {
        address: []
    },
    reducers: {
        saveLocation: (state, action) => {
           
            state.address = [action.payload]
            console.log(state.address);

            return state
        }
    }
})



export const { saveLocation } = locationSlice.actions
export const selectaddress = (state) => state.location?.address

export default locationSlice.reducer