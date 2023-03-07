import express from "express";
import prisma from "../db/index.js";
import argon2, { verify } from "argon2";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

const router = express.Router()

// router.get("/", async (request, response) => {
//     try {
//         const user = await prisma.user.findFirst({
//             where: {
//                 username: request.body.username
//             }
//         })

//         if (user) {
//             response.status(200).json({
//                 success: true,
//                 message: "User found",
//                 user
//             })
//         } else {
//             response.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }
//     } catch (err) {
//         console.log(err)
//         response.status(500).json({
//             success: false,
//             message: "Something went wrong"
//         })
//     }

// })

router.post("/signup", async (request, response) => {
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                username: request.body.username
            }
        })

        if (foundUser) {
            response.status(400).json({
                success: false,
                message: "User already exists"
            })
        } else {
            try {

                const hashPassword = await argon2.hash(request.body.password)

                if (hashPassword) {
                    const newUser = await prisma.user.create({
                        data: {
                            username: request.body.username,
                            password: hashPassword
                        }
                    })

                    if (newUser) {
                        console.log(newUser)
                        response.status(201).json({
                            success: true,
                            message: "User successfully created",
                            newUser
                        })
                    } else {
                        response.status(400).json({
                            success: false,
                            message: "Something went wrong. User not created."
                        })
                    }
                } else {
                    response.status(400).json({
                        success: false,
                        message: "Unsuccessful password"
                    })
                }

            } catch (e) {
                console.log(e)
                response.status(500).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
        }
    } catch (e) {
        console.log(e)
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})


router.post("/login", async (request, response) => {
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                username: request.body.username
            }
        })

        if (foundUser) {
            try {
                const verifyPassword = await argon2.verify(foundUser.password, request.body.password)

                if (verifyPassword) {
                    const token = jwt.sign({ username: foundUser.username, id: foundUser.id }, process.env.JSONKEY)


                    response.status(200).json({
                        success: true,
                        message: "User logged in",
                        token,
                        username: request.body.username
                    })
                } else {
                    response.status(401).json({
                        success: false,
                        message: "Wrong username or password"
                    })
                }
            } catch (e) {
                response.status(500).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
        } else {
            response.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
    } catch (e) {
        console.log(e)
    }
})

// router.delete("/", (request, response) => {
//     console.log(request.body)
//     response.status(200).send("this is a message")
// })

// router.put("/", (request, response) => {
//     console.log(request.body)
//     response.status(200).send("this is a message")
// })




export default router;