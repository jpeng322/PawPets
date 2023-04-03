import express from "express";
import prisma from "../db/index.js";
const router = express.Router();

router.post("/", async (request, response) => {
  console.log(request.body);
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: request.body.comment,
        commentUsername: request.body.commentUsername,
        petPostId: 1,
      },
    });
    console.log(newComment);
    if (newComment) {
      response.status(201).json({
        success: true,
        newComment,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Comment could not be created.",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/:petPostId", async (request, response) => {
  try {
    const getAllComments = await prisma.comment.findMany({
      where: {
        petPostId: parseInt(request.params.petPostId),
      },
    });
    if (getAllComments) {
      response.status(200).json({
        success: true,
        getAllComments,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Comments could not be received.",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
