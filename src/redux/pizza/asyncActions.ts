// если мы знаем, что в нашем обьекте вседа будут только строчки, то можем применить Record.
// он принимает в себя ключ и значание
// type FetchPizzasArgs = Record<string, string>

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchPizzaParams } from "./types"
import axios from "axios"


// export const fetchPizzas = createAsyncThunk(
//     'pizza/fetchPizzaStatus',
//     // можем не создавать лишний тип, а сразу в фу-ии обозначить типизацию
//     async (params: Record<string, string>) => {
//         const {category, sortBy, order, search, currentPage} = params
//         // типизируем метод get у axios. Теперь наша data вернет массив Pizza-ов
//         const {data} = await axios.get<Pizza[]>(`https://6361980467d3b7a0a6c9ba26.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//       return data
//     }
// )

// // либо тепизировать так createAsyncThunk. Он принимает Returned и ThunkArg.
// // и мы подставляем, что верни нам Pizza[] и прими аргументы
// export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
//     'pizza/fetchPizzaStatus',
//     async (params) => {
//         const {category, sortBy, order, search, currentPage} = params
//         // типизируем метод get у axios. Теперь наша data вернет массив Pizza-ов
//         const {data} = await axios.get<Pizza[]>(`https://6361980467d3b7a0a6c9ba26.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//       return data
//     }
// )



export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const {category, sortBy, order, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(`https://6361980467d3b7a0a6c9ba26.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      return data
    }
)