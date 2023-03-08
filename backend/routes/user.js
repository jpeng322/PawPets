import express from "express"
import prisma from "../db/index.js"


const router = express.Router()

router.get("/:id", async (request, response) => {

    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: parseInt(request.params.id)
            }
        })

        if (foundUser) {
            response.status(200).json({
                success: true,
                message: "User found",
                username: foundUser.username
            })

        } else {
            response.status(400).json({
                success: false,
                message: "User not found"
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