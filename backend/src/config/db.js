import mongoose from 'mongoose';

// Cache database connection across serverless invocations on Vercel
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    const errorMsg = '❌ [MongoDB] Fatal Error: MONGO_URI environment variable is missing.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // If already connected and ready, return existing cached connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      console.log(
        `✅ [MongoDB] Connected successfully to host: ${mongooseInstance.connection.host} | db: ${mongooseInstance.connection.name}`
      );
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`❌ [MongoDB] Connection Failed: ${error.message}`);
    throw error;
  }

  return cached.conn;
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export default connectDB;
