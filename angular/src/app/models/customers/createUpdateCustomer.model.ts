import { Gender } from "../../enums/gender.enum";

export interface CreateUpdateCustomer {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: Gender;
}