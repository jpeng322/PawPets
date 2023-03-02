import express from "express";
import { prisma } from "../db/index.js"; 


export default function userRouter(){

    const router = express.Router();

    //getting all the pets/posts
    router.get("/", async (request, response) => {
        
        const allPets = await prisma.pet.findMany()

        response.status(200).json({
            success: true
        });
    })



    router.get("/", async (request, response) => {

        const getPetsbyID = await prisma.pet.findMany({
            where:{
                id: parseInt(request.params.postId)
            }
        });

        console.log(getPetsbyID);
        
        response.status(200),json({
            success: true
        });
    })

    router.post("/", async (request, response) => {
        
        //makes a post
        console.log(request.body)
        try{
        const newPost = await prisma.pet.create({
            data: {
                name: request.body.name,
                species: request.body.species,
                id: 1
            }

        })
    }catch(error){
        console.log(error);
        response.status(400).json({
            message: "error!!!!!"
        });
    };
       
    
        response.status(201).json({
            success: true
        });
    });

    return router;
}
