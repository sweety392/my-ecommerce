import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

console.log(process.env.MONGO_URI);

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

// Global cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoose) => {
        console.log("MongoDB Connected Successfully");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;