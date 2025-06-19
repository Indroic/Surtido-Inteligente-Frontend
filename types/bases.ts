export interface BaseInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface BasePayType extends BaseInterface {
  name: string;
  description: string;
}
