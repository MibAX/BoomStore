import { Gender } from "../../enums/gender.enum";

export interface Customer {
    id: number;
    fullName: string;
    phoneNumber: string;
    gender: Gender;
    age: number;
}