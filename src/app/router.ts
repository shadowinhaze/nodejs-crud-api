import { Method } from './constants';
import { EndPoints, HandlerType } from './typings';

export class Router {
  public endpoints: EndPoints | Record<string, never> = {};

  private request(
    path: string,
    handler: HandlerType,
    method: Method = Method.get,
  ): void {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`Method: ${method} has existed yet`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: HandlerType): void {
    this.request(path, handler, Method.get);
  }

  post(path: string, handler: HandlerType): void {
    this.request(path, handler, Method.post);
  }

  put(path: string, handler: HandlerType): void {
    this.request(path, handler, Method.put);
  }

  delete(path: string, handler: HandlerType): void {
    this.request(path, handler, Method.delete);
  }
}
