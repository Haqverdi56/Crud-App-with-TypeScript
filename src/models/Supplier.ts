import { BaseModel } from "./BaseModel";

export interface Supplier extends BaseModel{
    companyName:string;
    contactName: number;
    contactTitle: number;
}