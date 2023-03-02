import express from "express"
import prisma from "../db/index.js"

const router = express.Router()

router.post("/", async (request, response) => {

    try {
        const newPet = await prisma.pet.create({
            data: {
                name: request.body.name,
                species: request.body.species,
                userId: 1
            }
        })

        if (newPet) {
            response.status(201).json({
                success: true,
                message: "Pet created",
                pet: newPet
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Pet was not created"
            })
        }
    } catch (e) {
        console.log(e)
        response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

export default router