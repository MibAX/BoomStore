import { Product } from "../products/product.model";

export interface CartItem {
    id: number,
    quantity: number,
    product: Product,
    cartItemPrice: number
}