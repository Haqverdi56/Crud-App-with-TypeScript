import { Supplier } from "../../models/Supplier";
import { BaseService } from "../base/BaseService";

export class SupplierService extends BaseService<Supplier> {

    constructor() {
        super('/suppliers')
    }
}