import { IncomingMessage, ServerResponse } from 'http';

import { Method } from './constants';

export type HandlerType = (reg: IncomingMessage, res: ServerResponse) => void;

export type EndPoint = {
  [method in Method]: HandlerType;
};

export interface EndPoints {
  [endpoint: string]: EndPoint | Record<string, never>;
}
