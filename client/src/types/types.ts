export type TickersType = {
  ticker: string;
  name: string;
};

export type IRouterType = {
  title: string;
  path?: string;
  element: JSX.Element;
  children?: IRouterType[];
};
