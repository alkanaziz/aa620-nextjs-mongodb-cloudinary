import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connection with MongoDB is successful: ${conn.connection.host}`)
  } catch (error) {
    console.log("db connecting error: ", error.message)
  }
}

export default connectDB;