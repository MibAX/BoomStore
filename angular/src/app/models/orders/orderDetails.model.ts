import { OrderStatus } from "../../enums/orderStatus.enum";
import { OrderProduct } from "./orderProduct.model";

export interface OrderDetails {
    id: number;
    orderDate: string;
    note: string;
    totalPrice: number;
    orderStatus: OrderStatus,
    orderProducts: OrderProduct[],
    customerFullName: string
}