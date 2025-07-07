import axios, { AxiosInstance } from "axios";
import { getToken } from "next-auth/jwt";

import { PaginationInterface } from "@/types/responses";
import { BACKEND_API_URL } from "@/globals";
import { JWT } from "next-auth";
import { NextApiRequest } from "next";

export type PaginationType = {
  limit: number;
  offset: number;
};

export interface OptionsInterface extends PaginationType {}

export interface ApiClientProps {
  baseUrl?: string;
  headers?: Record<string, string>;
  req: NextApiRequest;
}

// Factoría para crear instancias de Axios
class AxiosFactory {
  static createInstance(baseUrl: string, headers: Record<string, string> = {}) {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }
}

// Handler para autenticación
class AuthHandler {
  static addAuthHeader(
    headers: Record<string, string> = {},
    token: JWT | null,
  ) {
    if (token) {
      return {
        ...headers,
        Authorization: `${token.tokenType} ${token.accessToken}`,
      };
    }

    return headers;
  }
}

class ApiClient {
  axiosInstance: AxiosInstance;

  constructor(props: ApiClientProps) {
    let headers = props.headers || {};

    this.axiosInstance = AxiosFactory.createInstance(
      props.baseUrl || BACKEND_API_URL,
      headers
    );
    getToken({ req: props.req })
      .then((token) => {
        headers = AuthHandler.addAuthHeader(headers, token);
      })
      .catch(() => {
        headers = AuthHandler.addAuthHeader(headers, null);
      })
      .finally(() => {
        this.axiosInstance = AxiosFactory.createInstance(
          props.baseUrl || BACKEND_API_URL,
          headers
        );
      });
  }

  protected async get(subUrl: string, options?: OptionsInterface) {
    const response = await this.axiosInstance.get(subUrl, { params: options });

    return response.data;
  }
  protected async post(subUrl: string, data: any) {
    const response = await this.axiosInstance.post(subUrl, data);

    return response.data;
  }
  protected async put(subUrl: string, data: any) {
    const response = await this.axiosInstance.put(subUrl, data);

    return response.data;
  }
  protected async delete(subUrl: string) {
    const response = await this.axiosInstance.delete(subUrl);

    return response.data;
  }
}

class BaseAdapter extends ApiClient {
  subUrl: string;
  constructor(subUrl: string, props: ApiClientProps) {
    super(props);
    this.subUrl = subUrl.replace(/^\//, "");
  }
  async list(options?: OptionsInterface): Promise<PaginationInterface> {
    return this.get(this.subUrl, options);
  }
  async retrieve(pk: string): Promise<Record<string, any>> {
    return this.get(`${this.subUrl}/${pk}`);
  }
  async create(data: any): Promise<Record<string, any>> {
    return this.post(this.subUrl, data);
  }
  async update(data: any): Promise<Record<string, any>> {
    return this.put(this.subUrl, data);
  }
  async delete(pk: string): Promise<any> {
    return this.delete(`${this.subUrl}/${pk}`);
  }
}

export { BaseAdapter, ApiClient };
