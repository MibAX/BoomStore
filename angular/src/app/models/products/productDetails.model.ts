import { Category } from "../categories/category.model"

export interface ProductDetails {
    id: number,
    name: string,
    barCode: string,
    rating: number,
    price: number,
    description: string,
    category: Category
}