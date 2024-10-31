import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { router } from "./routers/post.router.js";
import { userRouter } from "./routers/user.router.js";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from 'cors'

dotenv.config();

const app = express();

// Initialize Redis client with retry strategy
let redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  // retry_strategy: (options) => {
  //   if (options.attempt > 10) return new Error('Redis connection failed');
  //   return Math.min(options.attempt * 100, 3000); // Retry delay
  // }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

// Initialize Redis store for session
let redisStore = new RedisStore({
  client: redisClient
});

app.enable('trust proxy');
app.use(cors())

app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60000
  }
}));

app.use(express.json());

// MongoDB connection with retry
async function connectWithRetry() {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:${process.env.MONGO_PORT}/?authSource=admin`
    );
    console.log("MongoDB connection established");
  } catch (err) {
    console.log("MongoDB connection failed, retrying in 5 seconds...", err);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  }
}
connectWithRetry();

app.use('/api/v1/posts', router);
app.use('/api/v1/users', userRouter);

app.get("/api/", (req, res) => {
  res.send("<h1>Hi Abhishek!!!</h1>");
  console.log("Idea for Business");
});

app.listen(process.env.PORT , () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
