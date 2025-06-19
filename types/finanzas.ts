import { BasePayType } from "./bases";

export interface BuyPayType extends BasePayType {}

export interface PayType extends BasePayType {
  is_bsc: boolean;
  is_credit: boolean;
}
