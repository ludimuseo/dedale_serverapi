// express.d.ts

import * as express from "express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: {
      userId: number;
      role: string;
    };
  }
}
