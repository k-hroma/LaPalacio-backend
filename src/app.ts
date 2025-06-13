import express from 'express'
import cors from 'cors'
import { bookRoute } from './routes/booksRoutes'
import { authRoutes } from './routes/authRoutes'
import { errorHandler } from './middleware/errorHandler'
import { protect } from './middleware/authMiddleware'
const app = express()
// permite usar el body de la peticion
app.use(express.json())
// permite que el front pueda utilizar el back
app.use(cors())

// antes de acceder a los productos->pedir permiso
// middleware-> una funcion que se ejecuta en el medio de la petición
app.use("/api/books", protect, bookRoute)
app.use("/api/auth", authRoutes)
// manejador de errores
app.use(errorHandler)

export { app }