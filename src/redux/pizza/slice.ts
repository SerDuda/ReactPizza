import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import { IPizzaSLiceState, Pizza, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: IPizzaSLiceState = {
    items: [],
    status: Status.LOADING
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, {payload}) {
            state.items = payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        })
        .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer