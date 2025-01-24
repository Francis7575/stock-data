export type IPricesType = {
  high: number
}

export type TickersType = {
  ticker: string;
  name: string;
  prices: IPricesType[];
};

export type IRouterType = {
  title: string;
  path?: string;
  element: JSX.Element;
  children?: IRouterType[];
};
