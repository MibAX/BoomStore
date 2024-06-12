import { Gender } from "../../enums/gender.enum";
import { Order } from "../orders/order.model";

export interface CustomerDetails {
    id: number;
    fullName: string;
    phoneNumber: string;
    gender: Gender;
    age: number;
    orders: Order[];
}