
import dotenv from 'dotenv'
import { ConnectionResult } from './types/ConnectionsResult'
import { app } from './app'
import { connectDB } from './config/mongoDB'


dotenv.config()

const PORT = Number(process.env.PORT) || 3000

const startServer = async(): Promise <ConnectionResult> => { 
  if (!PORT ||Number.isNaN(PORT)) { 
    const errMsg="❌ Invalid or missing PORT environment variable."
    console.error(errMsg)
    return {
      success: false,
      message:errMsg
    }
  }
  try {
    const connection = await connectDB()
    if (!connection) {
      console.error("❌ MongoDB connection failed")
     }
    app.listen(PORT, () => {
      const baseUrl = `http://localhost:${PORT}/api/books`;
       const msg = `✅ Server running on port ${PORT}`;
      console.log(msg)
      console.log(`📚 API available at: ${baseUrl}`)
    })
    
    return {
      success: true, 
      message:`Server started successfully on port ${PORT}`,
    }
    
  } catch (error:unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown server startup error."
    console.error(`❌ Fatal error starting server on port ${PORT}: ${errMsg}`)
    return {
      success: false,
      message: errMsg
    }

    
  }

}

startServer()