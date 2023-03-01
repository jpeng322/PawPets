import express from "express";
import { prisma } from "../db.js"; 


export default function userRouter(){

    const router = express.Router();

    //getting all the pets/posts
    router.get("/", async (request, response) => {
        
        const allPets = await prisma.post.findMany()
    })
    console.log(allPets);

    response.status(200).json({
        success: true
    });


    router.get("/", async (request, response) => {

        const getPetsbyID = await prisma.post.findMany({
            where:{
                id: parseInt(request.params.postId)
            }
        });

        console.log(getPetsbyID);
        
        response.status(200),json({
            success: true
        });
    })



}