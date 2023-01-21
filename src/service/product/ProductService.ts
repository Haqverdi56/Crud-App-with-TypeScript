import { Product } from "../../models/Product";
import { BaseService } from "../base/BaseService";

export class ProductService extends BaseService<Product> {
    constructor() {
        super("/products")
    }
}