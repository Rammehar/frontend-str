import axios, { AxiosInstance } from "axios";
import { apiConfig } from "../../../config";

export abstract class BaseAPI {
  protected baseUrl: string;
  private axiosInstance: AxiosInstance | any = null;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.axiosInstance = axios.create({});
  }

  protected get(url: string, params?: any, headers?: any): Promise<any> {
    return this.axiosInstance({
      method: "GET",
      url: `${this.baseUrl}${url}`,
      params: params ? params : null,
      headers: headers ? headers : null,
    });
  }

  protected post(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<any> {
    return this.axiosInstance.post(`${url}`, data ? data : null, {
      params: params ? params : null,
      headers: headers ? headers : null,
      onUploadProgress,
    });
  }
}
