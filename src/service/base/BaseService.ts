import { ResponseModel } from "../../models/ResponseModel";
import { apiInstance } from "../axiosInstance";

export class BaseService<T> {

    private endPoint: string = "";

    constructor(url:string) {
        this.endPoint = url
    }

    async getAll(url: string = this.endPoint):Promise<ResponseModel> {

        try{
            let apiResponse = await apiInstance.get(url)

            let response : ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: 200,
                errorMessage: ''
            }

            return response
        } catch (error:any){
            let response: ResponseModel = {
                data: [],
                status: false,
                statusCode: error.response.status,
                errorMessage: error.message
            }
            return response
        }
    }

    async add(data:T, url: string = this.endPoint): Promise<ResponseModel> {

        try {
            let apiResponse = await apiInstance.post(url, data);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: 200,
                errorMessage: ''
            }
            return response
        } catch(error:any) {
            let response: ResponseModel = {
                data: [],
                status: false,
                statusCode: error.response.status,
                errorMessage:error.message
            }
            return response
        }
    }

    async delete (url: string = this.endPoint): Promise<ResponseModel> {

        try {
            let apiResponse = await apiInstance.delete(url);

            let response: ResponseModel = {
                data: apiResponse.data,
                status: true,
                statusCode: 200,
                errorMessage: ''
            }
            return response
        } catch (error: any) {
            let response: ResponseModel = {
                data: [],
                status: false,
                statusCode: error.response.status,
                errorMessage:error.message
            }
            return response
        }
    }

}