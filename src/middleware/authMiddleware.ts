import { Request, Response, NextFunction } from "express";
import { QueryResponse } from "../types/ConnectionsResult";
import jwt from 'jsonwebtoken'

const protect = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {

  try {
    // verificar que exista el token
    const header= req.headers.authorization
    const token = header?.split(" ")[1]

    if (!token) { 
      res.status(401).json({
        success: false,
        message: "Token is required"
    });
    return
    };

    // validar el token
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
      res.status(401).json({
        success: false, 
        message: "Credentials empty or missing"
      })
      return
    }
    const valideToken = jwt.verify(token, secretKey)
    if (!valideToken) { 
      res.status(401).json({
        success: false,
        message: "Unexpected error"
      });
      return
    }
    next()

  } catch (error) {
    next(error)
    
  }

 }

export { protect }