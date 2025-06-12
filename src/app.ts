import express from 'express'
import cors from 'cors'
import { bookRoute } from './routes/booksRoutes'
import { authRoutes } from './routes/authRoutes'
import { errorHandler } from './middleware/errorHandler'
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/books", bookRoute)
app.use("/api/auth", authRoutes)
app.use(errorHandler)

export { app }