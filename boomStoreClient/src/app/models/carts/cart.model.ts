import { CartStatus } from "../../enums/cart-status.enum";
import { CartItem } from "./cart-item.model";

export interface Cart {
    id: number,
    totalPrice: number,
    note: string,
    cartStatus: CartStatus,
    cartItems: CartItem[]
}