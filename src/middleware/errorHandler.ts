import { Request, Response, NextFunction } from "express"
import { QueryResponse } from "../types/ConnectionsResult"

const errorHandler = (err: unknown, req: Request, res: Response<QueryResponse>, _next: NextFunction): void => {
  console.error("Error capturado:", err)

  const errMsg = err instanceof Error ? err.message : "Unexpected error"
  res.status(500).json({
    success: false,
    message: errMsg
  });
};

export { errorHandler }
