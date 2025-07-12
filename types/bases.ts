export interface BaseInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface BasePayType extends BaseInterface {
  name: string;
  description: string;
}

export type BaseErrorInterface<T> = {
  [P in keyof T]?: string[];
};
