import { Router } from 'express'
import { addUser, getAllUsers, logUser } from '../controllers/authControllers'

const authRoutes = Router()

authRoutes.post("/register", addUser)

authRoutes.post("/login", logUser)

authRoutes.get("/", getAllUsers)

  
export { authRoutes }