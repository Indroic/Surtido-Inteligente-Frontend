import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { BackendAdapter } from "@/adapters/bases";
import { loadIDParam } from "@/hooks/common/details/useIDSearchParam";
import { PaginationInterface } from "@/types/responses";

/**
 * Clase base para generar handlers de rutas RESTful de manera genérica.
 * Permite personalizar cada handler mediante inyección de lógica o sobreescritura.
 */
type ErrorHandler = (error: any) => NextResponse;

type BaseMethodHandler<T> = (
  req: NextRequest,
  adapter: Awaited<T>,
) => Promise<NextResponse>;

type CustomMethodHandler<T> = (
  req: NextRequest,
  adapter: Awaited<T>,
  baseHandler: BaseMethodHandler<T>,
  errorHandler: ErrorHandler,
) => Promise<NextResponse>;

type AdapterFactoryType<T> = (req: NextRequest) => T;
type OptionsType<T> = {
  get?: CustomMethodHandler<T>;
  post?: CustomMethodHandler<T>;
  put?: CustomMethodHandler<T>;
  delete?: CustomMethodHandler<T>;
};

export class GenericRouteHandlers<
  TEntity,
  TAdapterPromise extends Promise<BackendAdapter<TEntity>>,
> {
  private adapterFactory: AdapterFactoryType<TAdapterPromise>;
  private options?: OptionsType<TAdapterPromise>;

  constructor(
    adapterFactory: AdapterFactoryType<TAdapterPromise>,
    options?: OptionsType<TAdapterPromise>,
  ) {
    this.adapterFactory = adapterFactory;
    this.options = options;
  }
  /* Cada funcion privada es un comportamiento generico */

  private async _getGeneric(
    req: NextRequest,
    adapter: Awaited<TAdapterPromise>,
  ) {
    const { id } = loadIDParam(req);

    if (id) {
      try {
        const result: TEntity = await adapter.retrieve(id);

        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        return this.handleError(error);
      }
    }
    try {
      const result = await adapter.list(req);

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return this.handleError(error, true);
    }
  }

  private async _postGeneric(
    req: NextRequest,
    adapter: Awaited<TAdapterPromise>,
  ) {
    try {
      const body = await req.json();
      const result: TEntity = await adapter.create(body);

      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async _putGeneric(
    req: NextRequest,
    adapter: Awaited<TAdapterPromise>,
  ) {
    const { id } = loadIDParam(req);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
      const body = await req.json();
      const result: TEntity = await adapter.update(id, body);

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return this.handleError(error);
    }
  }

  private async _deleteGeneric(
    req: NextRequest,
    adapter: Awaited<TAdapterPromise>,
  ) {
    const { id } = loadIDParam(req);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
      await adapter.delete(id);

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async get(req: NextRequest) {
    const adapter = await this.adapterFactory(req);

    if (this.options?.get) {
      return this.options.get(
        req,
        adapter,
        this._getGeneric.bind(this),
        this.handleError.bind(this),
      );
    }

    return this._getGeneric(req, adapter);
  }

  async post(req: NextRequest) {
    const adapter = await this.adapterFactory(req);

    if (this.options?.post) {
      return this.options.post(
        req,
        adapter,
        this._postGeneric.bind(this),
        this.handleError.bind(this),
      );
    }

    return this._postGeneric(req, adapter);
  }

  async put(req: NextRequest) {
    const adapter = await this.adapterFactory(req);

    if (this.options?.put) {
      return this.options.put(
        req,
        adapter,
        this._putGeneric.bind(this),
        this.handleError.bind(this),
      );
    }

    return this._putGeneric(req, adapter);
  }

  async delete(req: NextRequest) {
    const adapter = await this.adapterFactory(req);

    if (this.options?.delete) {
      return this.options.delete(
        req,
        adapter,
        this._deleteGeneric.bind(this),
        this.handleError.bind(this),
      );
    }

    return this._deleteGeneric(req, adapter);
  }

  /**
   * Devuelve todos los handlers listos para exportar en el archivo de ruta.
   */
  getAllHandlers() {
    return {
      GET: this.get.bind(this),
      POST: this.post.bind(this),
      PUT: this.put.bind(this),
      DELETE: this.delete.bind(this),
    };
  }

  /**
   * Manejo de errores estándar para todas las rutas.
   */
  handleError(error: any, list: boolean = false) {
    if (isAxiosError(error)) {
      if (list) {
        const data: PaginationInterface<TEntity> = {
          count: 0,
          next: null,
          previous: null,
          results: [],
          page: 0,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
          limit: 0,
          offset: 0,
        };

        return NextResponse.json(data, { status: 500 });
      }

      return NextResponse.json(error.response?.data, {
        status: error.response?.status || 500,
      });
    }

    return NextResponse.json(
      { error: error?.message || error },
      { status: 500 },
    );
  }
}
