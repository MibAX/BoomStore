import { OrderStatus } from "../../enums/orderStatus.enum";

export interface Order {
    id: number;
    orderDate: string;
    note: string;
    totalPrice: number;
    orderStatus: OrderStatus,
    customerFullName: string
}