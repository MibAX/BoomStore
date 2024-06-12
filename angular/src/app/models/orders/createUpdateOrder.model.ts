import { OrderProduct } from "./orderProduct.model";

export interface CreateUpdateOrder {
    id: number;
    note: string;
    orderProduct: OrderProduct[],
    customerId: number
}