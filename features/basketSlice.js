import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: []
    },
    reducers: {
        addToBasket: (state, action) => {

            // const newCart = state.items.filter(item => item.id == action.payload.id)

            // if (newCart.length) {


            //     const result = state.items.map((item) => {
            //         if (item.id === action.payload.id) {
            //             return {
            //                 ...item,
            //                 quantity: item.quantity + 1
            //             }

            //         }
            //         return item
            //     }
            //     )

            //     state.items = result
            //     console.log('lengtg itemsstate', result);
            // }
            // else {
            state.items = [...state.items, action.payload]

            // }
            // console.log(state.items, 'itemsstate', newCart);
        },
        removeFromBasket: (state, action) => {
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
        resetStore: (state) => {
            state.items = []
        },
    }
})

export const { addToBasket, removeFromBasket, resetStore } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items

export const cart = (state) => {
    const toFindDuplicates = (state) => state.basket.items.filter((item, index) => state.indexOf(item) !== index)
    const duplicateElementa = toFindDuplicates(arry);
}

export const selectBasketItemsWithId = (state, id) =>
    state.basket.items.filter((item) => item.id === id)

export const selectBasketItemsQuantity = (state, id) =>
    state.basket.items.filter((item) => item.id === id)

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) =>
    total += item.price, 0)

export default basketSlice.reducer