import axios, { AxiosError, AxiosInstance, isAxiosError } from "axios";
import { JWT } from "next-auth/jwt";
import { NextApiRequest } from "next";

import { PaginationInterface, PaginationResponse } from "@/types/responses";
import { BACKEND_API_URL, BACKEND_URL } from "@/globals";

export type PaginationType = {
  limit: number;
  offset: number;
};

export interface OptionsInterface extends PaginationType {}

export interface ApiClientProps {
  baseUrl?: string;
  headers?: Record<string, string>;
  token?: JWT;
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
  static addAuthHeader(headers: Record<string, string> = {}, token?: JWT) {
    if (token) {
      return {
        ...headers,
        Authorization: `${token.tokenType} ${token.accessToken}`,
      };
    }

    return headers;
  }
}

// --- Pagination URL Parser ---
class PaginationUrlParser {
  static parse(
    url: string | null,
    baseUrl: string,
  ): { limit: number; offset: number } | null {
    if (!url) return null;
    let params: URLSearchParams;

    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        params = new URL(url).searchParams;
      } else {
        params = new URL(url, baseUrl).searchParams;
      }
    } catch {
      return null;
    }
    const limit = parseInt(params.get("limit") || "10", 10);
    const offset = parseInt(params.get("offset") || "0", 10);

    return { limit, offset };
  }
}

// --- Pagination Data Calculator ---
class PaginationDataCalculator {
  static calculate({
    count,
    next,
    previous,
  }: {
    count: number;
    next: { limit: number; offset: number } | null;
    previous: { limit: number; offset: number } | null;
  }) {
    const limit = next?.limit || previous?.limit || 10;
    const offset =
      next?.offset !== undefined
        ? next.offset - limit
        : previous?.offset !== undefined
          ? previous.offset + limit
          : 0;
    const page = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(count / limit);

    return { limit, offset, page, totalPages };
  }
}

class LimitOffsetPaginationHandler {
  static fromResponse(response: PaginationResponse<any>, baseUrl: string) {
    const next = PaginationUrlParser.parse(response.next, baseUrl);
    const previous = PaginationUrlParser.parse(response.previous, baseUrl);
    const { limit, offset, page, totalPages } =
      PaginationDataCalculator.calculate({
        count: response.count,
        next,
        previous,
      });

    return {
      count: response.count,
      next,
      previous,
      results: response.results,
      page,
      totalPages,
      hasNext: !!next,
      hasPrevious: !!previous,
      limit,
      offset,
    };
  }
}

class ApiClient {
  axiosInstance: AxiosInstance;

  constructor(props: ApiClientProps) {
    const headers = AuthHandler.addAuthHeader(props.headers, props.token);

    this.axiosInstance = AxiosFactory.createInstance(
      props.baseUrl ? props.baseUrl : BACKEND_API_URL,
      headers,
    );
  }

  protected async get(subUrl: string, params?: URLSearchParams) {
    try {
      const response = await this.axiosInstance.get(subUrl, {
        params: params,
      });

      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  }
  protected async post(subUrl: string, data: Record<string, any>) {
    try {
      const response = await this.axiosInstance.post(
        subUrl,
        JSON.stringify(data),
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
    }
  }
  protected async put(subUrl: string, data: any) {
    try {
      const response = await this.axiosInstance.put(subUrl, data);

      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  }
  protected async delete(subUrl: string) {
    try {
      const response = await this.axiosInstance.delete(subUrl);

      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  }
}

class BackendAdapter extends ApiClient {
  subUrl: string;
  constructor(subUrl: string, props: ApiClientProps) {
    super(props);
    this.subUrl = subUrl.replace(/^\//, "");
  }
  async list(req?: NextApiRequest): Promise<PaginationInterface<any>> {
    try {
      const params = req
        ? new URL(req.url as string).searchParams
        : new URLSearchParams();
      const response = await this.get(this.subUrl, params);

      return LimitOffsetPaginationHandler.fromResponse(response, BACKEND_URL);
    } catch (error) {
      throw error as AxiosError;
    }
  }
  async retrieve(pk: string): Promise<Record<string, any>> {
    try {
      return this.get(`${this.subUrl}/${pk}`);
    } catch (error) {
      throw error as AxiosError;
    }
  }
  async create(data: any): Promise<Record<string, any>> {
    try {
      return this.post(this.subUrl, data);
    } catch (error) {
      throw error as AxiosError;
    }
  }
  async update(data: any): Promise<Record<string, any>> {
    try {
      return this.put(this.subUrl, data);
    } catch (error) {
      throw error as AxiosError;
    }
  }
  async delete(pk: string): Promise<any> {
    try {
      return this.delete(`${this.subUrl}/${pk}`);
    } catch (error) {
      throw error as AxiosError;
    }
  }
}

export { BackendAdapter, ApiClient };
