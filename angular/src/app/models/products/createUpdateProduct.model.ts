import { Category } from "../categories/category.model"

export interface CreateUpdateProduct {
    id: number,
    name: string,
    barCode: string,
    rating: number,
    price: number,
    description: string,
    categoryId: number
}