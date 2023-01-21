import { BaseModel } from "./BaseModel";

export interface Product extends BaseModel{
    name:string;
    unitPrice: number;
    unitsInStock: number;
}