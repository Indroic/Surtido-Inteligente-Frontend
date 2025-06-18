import axios, { AxiosInstance } from "axios";

export type PaginationType = {
  limit: number;
  offset: number;
};

export interface OptionsInterface extends PaginationType {}

class ApiClient {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: { "Content-Type": "application/json" },
    });
  }

  async get(subUrl: string, options?: OptionsInterface) {
    const response = await this.axiosInstance.get(subUrl, { params: options });

    return response.data;
  }
  async post(subUrl: string, data: any) {
    const response = await this.axiosInstance.post(subUrl, data);

    return response.data;
  }
  async put(subUrl: string, data: any) {
    const response = await this.axiosInstance.put(subUrl, data);

    return response.data;
  }

  async delete(subUrl: string) {
    const response = await this.axiosInstance.delete(subUrl);

    return response.data;
  }
}

class AuthenticatedApiClient extends ApiClient {
  constructor(baseUrl: string, token: string) {
    super(baseUrl);
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: { "Content-Type": "application/json", Authorization: token },
    });
  }
}

class BaseAdapter {
  client: ApiClient | AuthenticatedApiClient;
  subUrl: string;
  token?: string;
  constructor(
    apiClient: ApiClient | AuthenticatedApiClient,
    subUrl: string,
    token?: string,
  ) {
    this.client = apiClient;
    this.subUrl = subUrl.replace("/", "");
    this.token = token;
  }

  async list(options?: OptionsInterface) {
    const response = await this.client.get(this.subUrl, options);

    return response;
  }

  async retrieve(pk: string) {
    const response = await this.client.get(`${this.subUrl}/${pk}`);

    return response;
  }

  async create(data: any) {
    const response = await this.client.post(this.subUrl, data);

    return response;
  }

  async update(data: any) {
    const response = await this.client.put(this.subUrl, data);

    return response;
  }

  async delete(pk: string) {
    const response = await this.client.delete(`${this.subUrl}/${pk}`);

    return response;
  }
}

export { ApiClient, AuthenticatedApiClient, BaseAdapter };
