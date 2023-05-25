import { CartItem } from "../redux/cart/types"

// export const calcTotalprice = (items: CartItem[]) => {
//     return items.reduce((sum: number, obj: { price: number; count: number }) => obj.price * obj.count + sum, 0)
// }
export const calcTotalprice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}