import { Response, Request, NextFunction } from "express"
import { User, LogUser } from "../models/authModels"
import { RegisterUser, LoginUser } from "../types/authTypes"
import bcryptjs from 'bcryptjs'
import { QueryResponse } from "../types/ConnectionsResult"

const addUser = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  try {
    const { nombre, email, password } = req.body
    if (!nombre || !email || !password) { 
      res.status(400).json({
        success: false,
        message: "Nombre, email and pass are required."
      })
      return
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Ya existe un usuario registrado con este email.",
      });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = await new User<RegisterUser>({ nombre, email, password: hashedPassword }).save()
    if (!newUser) {
      res.status(403).json({
        success: false,
        message: "Unexpected error"
      })
      return
    }
    res.status(201).json({
      success: true,
      message: "User successfully created:",
      data: {
        nombre: newUser.nombre,
        email: newUser.email,
      }
    })
    
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
      })
      return
    }

    const user = await User.findOne({ email })
    if (!user) { 
      res.status(401).json({
        success: false,
        message:"Unauthorized"
      })
      return
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) { 
      res.status(401).json({
        success: false,
        message:"Unauthorized"
      })
      return
    }

    await new LogUser<LoginUser>({ email, password }).save()

    const userData = {
      nombre: user.nombre,
      email: user.email
    }

    res.status(200).json({
      success: true,
      message: "User successfully logged",
      data: userData
    })

  } catch (error) {
    next(error)
  }
}


const getAllUsers = async (req: Request, res:Response):Promise<void> => { 
  try {
    const allUsers = await User.find()
    res.status(200).json({
      success: true,
      message: allUsers.length > 0 ? "Users:" : "Not users found",
      data: allUsers
    })
    
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error while getting users"

    res.status(500).json({
      success: false,
      message: errMsg
    })
    
  }
}
export {addUser, logUser, getAllUsers }