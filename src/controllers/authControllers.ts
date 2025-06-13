import { Response, Request, NextFunction } from "express"
import { User, LogUser } from "../models/authModels"
import { RegisterUser, LoginUser } from "../types/authTypes"
import bcryptjs from 'bcryptjs'
import { QueryResponse } from "../types/ConnectionsResult"
import jwt from 'jsonwebtoken'

const addUser = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  try {
    const { nombre, email, password } = req.body
    
    if (!nombre || !email || !password) { 
      res.status(400).json({
        success: false,
        message: "Nombre, email and pass are required."
      });
      return
    }

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "There is already a registered user with this email.",
      });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await new User<RegisterUser>({ nombre, email, password: hashedPassword }).save()
    
    if (!newUser) {
      res.status(403).json({
        success: false,
        message: "Unexpected error"
      });
      return
    }

    res.status(201).json({
      success: true,
      message: "User successfully created:",
      data: {
        id: newUser._id.toString(),
        nombre: newUser.nombre,
        email: newUser.email,
      }
    });
    
  } catch (error) {
    next(error)
    
  }
}

const logUser = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  
  try {
    const { email, password } = req.body
    if (!email || !password) { 
      res.status(400).json({
        success: false,
        message: "Bad request: email and pass are required"
      });
      return
    };

    const user = await User.findOne({ email })
    if (!user) { 
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return
    };

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) { 
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return
    };

    // generar un permiso (token)

    const payload = { _id: user._id, nombre: user.nombre }
    const secretKey = process.env.JWT_SECRET!
  
    const token = jwt.sign(payload, secretKey, { expiresIn: "10m" })

    await new LogUser<LoginUser>({ email, password }).save()

    const userData = {
      nombre: user.nombre,
      email: user.email
    };

    res.status(200).json({
      success: true,
      message: "User successfully logged",
      data: token,
    });

  } catch (error) {
    next(error)
  }
}


export {addUser, logUser}