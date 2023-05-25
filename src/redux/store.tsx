import { configureStore } from "@reduxjs/toolkit";
import filter from './filter/slice'
import cart from './cart/slice'
import pizza from './pizza/slice'
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    }
})

// store.getState - в нем храниться глобальное состояние нашего стора в виде фу-ии. Все наши рельюсеры
// благодаря ReturnType - мы достаем наше состояние в виде обьекта
export type RootState = ReturnType<typeof store.getState>

// типизируем dispatch. возвращаем обьект
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

