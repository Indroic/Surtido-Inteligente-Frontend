import axios, { AxiosInstance } from "axios";

type PaginationType = {
  limit: number;
  offset: number;
};

interface OptionsInterface extends PaginationType {}

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

  async get(url: string, options?: OptionsInterface) {
    const response = await this.axiosInstance.get(url, { params: options });

    return response.data;
  }
  async post(url: string, data: any) {
    const response = await this.axiosInstance.post(url, data);

    return response.data;
  }
  async put(url: string, data: any) {
    const response = await this.axiosInstance.put(url, data);

    return response.data;
  }

  async delete(url: string) {
    const response = await this.axiosInstance.delete(url);

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
  backendAdapter: ApiClient | AuthenticatedApiClient;
  url: string;
  token?: string;
  constructor(url: string, token?: string) {
    this.backendAdapter = token
      ? new AuthenticatedApiClient(url, token)
      : new ApiClient(url);
    this.url = url;
    this.token = token;
  }

  async get(options?: { limit: number; offset: number }) {
    const response = await this.backendAdapter.get(this.url, options);

    return response;
  }

  async create(data: any) {
    const response = await this.backendAdapter.post(this.url, data);

    return response;
  }

  async update(data: any) {
    const response = await this.backendAdapter.put(this.url, data);

    return response;
  }

  async delete() {
    const response = await this.backendAdapter.delete(this.url);

    return response;
  }
}

export { ApiClient, AuthenticatedApiClient, BaseAdapter };
