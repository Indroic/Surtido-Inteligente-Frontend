import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

import { BackendAdapter } from "./bases";

import { ImpuestoInterface, DocumentTypeInterface } from "@/types/legal";
import { PaginationInterface } from "@/types/responses";

export class ImpuestosAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("legal/impuestos/", { token: token });
  }
  async list(
    req?: NextRequest,
  ): Promise<PaginationInterface<ImpuestoInterface>> {
    return (await super.list(req)) as PaginationInterface<ImpuestoInterface>;
  }

  async retrieve(pk: string): Promise<ImpuestoInterface> {
    return (await super.retrieve(pk)) as ImpuestoInterface;
  }

  async create(data: ImpuestoInterface): Promise<ImpuestoInterface> {
    return (await super.create(data)) as ImpuestoInterface;
  }

  async update(
    pk: string,
    data: ImpuestoInterface,
  ): Promise<ImpuestoInterface> {
    return (await super.update(pk, data)) as ImpuestoInterface;
  }
}

export class DocumentsStypesAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("legal/documents", { token: token });
  }
  async list(
    req?: NextRequest,
  ): Promise<PaginationInterface<DocumentTypeInterface>> {
    return (await super.list(
      req,
    )) as PaginationInterface<DocumentTypeInterface>;
  }
  async retrieve(pk: string): Promise<DocumentTypeInterface> {
    return (await super.retrieve(pk)) as DocumentTypeInterface;
  }
  async create(data: DocumentTypeInterface): Promise<DocumentTypeInterface> {
    return (await super.create(data)) as DocumentTypeInterface;
  }
  async update(
    pk: string,
    data: DocumentTypeInterface,
  ): Promise<DocumentTypeInterface> {
    return (await super.update(pk, data)) as DocumentTypeInterface;
  }
}
