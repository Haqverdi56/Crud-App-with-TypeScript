import { Category } from "../../models/Category";
import { BaseService } from "../base/BaseService";

export class CategoryService extends BaseService<Category> {
    constructor() {
        super('/categories')
    }
}