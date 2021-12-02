// tslint:disable-next-line: no-any
export type Icon = any;

export interface IStoredData<T> {
  data: T[];
}

export interface IUserSettings {}

export interface IWindowInfo {
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
}

export interface IScreenInfo {
  width: number;
  height: number;
}

export interface ISymbolData {
  lSymbol: string;
  rSymbol: string;
  volume: number;
  price: number;
  currency: number;
  growth: number;
  saved: boolean;
}

export type IRequestMethod = 'get' | 'post';

export interface IRequestHeaders {
  [key: string]: string;
}

export interface IRequestOptions {
  url: string;
  method: IRequestMethod;
  headers?: IRequestHeaders;
}

export interface IBinanceSymbolPriceData {
  symbol: string;
  price: string;
}
