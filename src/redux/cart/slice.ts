import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { calcTotalprice } from '../../utils/calcTotlaPrice';
import { CartItem, ICartSliceState } from './types';


// берет из LS данные, вычисляет и сохраняет в initialState.
// const {items, totalPrice}= getCartFromLocalStorage();
// const initialState: ICartSliceState = {
//     totalPrice,
//     items
// }

// сократили нашу логику
const initialState: ICartSliceState = getCartFromLocalStorage()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const finditem = state.items.find(obj => obj.id === action.payload.id);
            if (finditem) {
                finditem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalprice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        minusItem(state, action: PayloadAction<string>) {
            const finditem = state.items.find(obj => obj.id === action.payload)
            if (finditem) {
                finditem.count--
            }
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0
        }
    }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer