import express from "express";
import userRouter from "./routes/post.js";




export default async function createServer(){
    
    const app = express();

    app.use(express.json());

    app.use("/post",userRouter())

    return app;
}

