import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiInstance } from "./axios";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
export const httpRequest = async ({
  url,
  method,
  data,
  params,
}: AxiosRequestConfig): Promise<any> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    params,
  };

  try {
    const response: AxiosResponse<ApiResponse<any>> = await apiInstance(config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
