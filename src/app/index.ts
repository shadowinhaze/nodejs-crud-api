import { EventEmitter } from 'events';
import { createServer, Server } from 'http';

import { Method, StatusCode } from './constants';
import { Router } from './router';

export class App {
  private emitter = new EventEmitter();

  private server: Server = this.makeServer();

  private makeServer(): Server {
    return createServer((req, res) => {
      const cleanUrl =
        req.url[req.url.length - 1] === '/'
          ? req.url.slice(1, -1)
          : req.url.slice(1);

      const [base, param] = cleanUrl.split('/');

      if (param) {
        req.headers.userId = param;
      }

      const buffers: Uint8Array[] = [];

      req.on('data', (chunk) => {
        buffers.push(chunk);
      });

      req.on('end', () => {
        const data = Buffer.concat(buffers).toString();

        req.headers.transferData = data || '{}';

        const event = this.emitter.emit(
          this.getRouteMask(param ? 'user' : base, req.method),
          req,
          res,
        );

        if (!event) {
          res.writeHead(StatusCode.notFound);
          res.end();
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private getRouteMask(path: string, method: string): string {
    return `${path}:${method}`;
  }

  public addRouter(router: Router): void {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method: Method) => {
        const handler = endpoint[method];

        this.emitter.on(this.getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  public listen(port: string, cb: () => void): void {
    this.server.listen(port, cb);
  }

  get testServer(): Server {
    return this.server;
  }
}
