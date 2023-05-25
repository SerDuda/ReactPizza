import { CartItem } from "../redux/cart/types";
import { calcTotalprice } from "./calcTotlaPrice";

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalprice(items)

    return {
        items: items as CartItem[],
        totalPrice
    }
}