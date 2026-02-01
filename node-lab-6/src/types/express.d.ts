import { Payload } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export {};
