const mongoose = require("mongoose");

// Cache the connection across serverless invocations so we don't open a new
// MongoDB connection on every request (and never call process.exit, which would
// crash the whole Vercel function -> FUNCTION_INVOCATION_FAILED).
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // allow a retry on the next invocation
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
