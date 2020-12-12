interface Route {
  method: string;
  url: string;
  middlewares: Function[];
  methodName: string;
}
