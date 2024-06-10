import { Gender } from "../../enums/gender.enum";

export interface CustomerDetails {
    id: number;
    fullName: string;
    phoneNumber: string;
    gender: Gender;
    age: number;
    //orders: Order[];
}