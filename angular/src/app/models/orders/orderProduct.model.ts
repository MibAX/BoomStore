import { Product } from "../products/product.model";

export interface OrderProduct {
    product: Product;
    quantity: number;
    totalPrice: number;
}
