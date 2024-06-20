import { createUpdateOrderProduct } from "./createUpdateOrderProduct.model";

export interface CreateUpdateOrder {
    id: number;
    note: string;
    orderProducts: createUpdateOrderProduct[],
    customerId: number
}