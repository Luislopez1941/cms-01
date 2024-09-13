import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;
  
 constructor(baseURL: string = 'https://back-ecommerce-kyxa.onrender.com/') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
 

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig // Añadir este argumento
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.request({
      method,
      url,
      data,
      ...config, // Añadir configuraciones adicionales
    });
    return response.data;
  }

  public get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('GET', url, undefined, config);
  }

  public post<T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('POST', url, data, config);
  }
  
  public put<T>(path: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('PUT', url, data, config);
  }
}

export default new ApiService();
