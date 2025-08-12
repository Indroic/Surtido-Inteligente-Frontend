import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { loadIDParam } from "@/hooks/common/details/useIDSearchParam";

/**
 * Clase base para generar handlers de rutas RESTful de manera genérica.
 * Permite personalizar cada handler mediante inyección de lógica o sobreescritura.
 */

export class GenericRouteHandlers<TAdapterPromise, TEntity, TPagination> {
  adapterFactory: (req: NextRequest) => TAdapterPromise;
  options?: {
    get?: (
      req: NextRequest,
      adapter: Awaited<TAdapterPromise>,
    ) => Promise<NextResponse>;
    post?: (
      req: NextRequest,
      adapter: Awaited<TAdapterPromise>,
    ) => Promise<NextResponse>;
    put?: (
      req: NextRequest,
      adapter: Awaited<TAdapterPromise>,
    ) => Promise<NextResponse>;
    delete?: (
      req: NextRequest,
      adapter: Awaited<TAdapterPromise>,
    ) => Promise<NextResponse>;
  };

  constructor(
    adapterFactory: (req: NextRequest) => TAdapterPromise,
    options?: {
      get?: (
        req: NextRequest,
        adapter: Awaited<TAdapterPromise>,
      ) => Promise<NextResponse>;
      post?: (
        req: NextRequest,
        adapter: Awaited<TAdapterPromise>,
      ) => Promise<NextResponse>;
      put?: (
        req: NextRequest,
        adapter: Awaited<TAdapterPromise>,
      ) => Promise<NextResponse>;
      delete?: (
        req: NextRequest,
        adapter: Awaited<TAdapterPromise>,
      ) => Promise<NextResponse>;
    },
  ) {
    this.adapterFactory = adapterFactory;
    this.options = options;
  }

  get = async (req: NextRequest) => {
    const adapter = await this.adapterFactory(req);

    if (this.options?.get) return this.options.get(req, adapter);
    try {
      // Por defecto: listar o recuperar detalle
      const { id } = loadIDParam(req);

      if (id) {
        const result: TEntity = await (adapter as any).retrieve(id);

        return NextResponse.json(result, { status: 200 });
      }
      const result: TPagination = await (adapter as any).list(req);

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return this.handleError(error);
    }
  };

  post = async (req: NextRequest) => {
    const adapter = await this.adapterFactory(req);

    if (this.options?.post) return this.options.post(req, adapter);
    try {
      const body = await req.json();
      const result: TEntity = await (adapter as any).create(body);

      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return this.handleError(error);
    }
  };

  put = async (req: NextRequest) => {
    const adapter = await this.adapterFactory(req);

    if (this.options?.put) return this.options.put(req, adapter);
    try {
      const { id } = loadIDParam(req);

      if (!id) {
        return NextResponse.json({ formError: "ID Missing" }, { status: 400 });
      }
      const body = await req.json();
      const result = await (adapter as any).update(id, body);

      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return this.handleError(error);
    }
  };

  delete = async (req: NextRequest) => {
    const adapter = await this.adapterFactory(req);

    if (this.options?.delete) return this.options.delete(req, adapter);
    try {
      const { id } = loadIDParam(req);

      if (!id) {
        return NextResponse.json({ formError: "ID Missing" }, { status: 400 });
      }
      await (adapter as any).delete(id);

      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      return this.handleError(error);
    }
  };

  /**
   * Devuelve todos los handlers listos para exportar en el archivo de ruta.
   */
  getAllHandlers() {
    return {
      GET: this.get,
      POST: this.post,
      PUT: this.put,
      DELETE: this.delete,
    };
  }

  /**
   * Manejo de errores estándar para todas las rutas.
   */
  handleError(error: any) {
    if (isAxiosError(error)) {
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
