import { Product } from "../products/product.model";

export interface CategoryDetails {
    id: number,
    name: string,
    description: string,
    products: Product[]
}
