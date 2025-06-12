import { connect } from 'mongoose'
import dotenv from 'dotenv'
import { ConnectionResult } from '../types/ConnectionsResult'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI || ""
const connectDB = async (): Promise<ConnectionResult> => { 
  if (!MONGODB_URI) {
    const errMsg = "❌MongoDB URI is missing.."
    console.error(errMsg)
    return {
      success: false,
      message: errMsg,
    };
  }
  try {
    await connect(MONGODB_URI, { serverSelectionTimeoutMS: 500 })
    const msg = '✅ MongoDB connected successfully.'
    console.log(msg)
    return {
      success: true,
      message: msg
    }
    
  } catch (error:unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error while connecting to MongoDB."
    console.error(`❌ MongoDB connection failed: ${errMsg}`)
    return {
      success: false,
      message: errMsg,
    }
    
  }

}

export { connectDB }

