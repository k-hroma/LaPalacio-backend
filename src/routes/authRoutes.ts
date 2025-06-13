import { Router } from 'express'
import { addUser,logUser } from '../controllers/authControllers'

const authRoutes = Router()

authRoutes.post("/register", addUser)

authRoutes.post("/login", logUser)

export { authRoutes }