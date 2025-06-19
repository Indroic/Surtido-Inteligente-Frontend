import { BaseAdapter, AuthenticatedApiClient } from "./bases";

export class BillsAdapter extends BaseAdapter {
  constructor(apiClient: AuthenticatedApiClient) {
    super(apiClient, "/bills");
  }
}

export class ProductAdapter extends BaseAdapter {
  constructor(apiClient: AuthenticatedApiClient) {
    super(apiClient, "/products");
  }
}

export class InventoryAdapter extends BaseAdapter {
  constructor(apiClient: AuthenticatedApiClient) {
    super(apiClient, "/inventory");
  }
}
