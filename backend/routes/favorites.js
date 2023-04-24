import express from "express";
import prisma from "../db/index.js";
const router = express.Router();
import passport from "passport";

router.post("/", async (request, response) => {
  try {
    const foundFavorite = await prisma.favorites.findMany({
      where: {
        userId: parseInt(request.body.userId),
        petId: parseInt(request.body.petId),
      },
    });
    console.log(foundFavorite)

    if (foundFavorite.length > 0) {
      response.status(500).json({
        success: false,
        message: "Post already favorited",
      });
    } else {
      const createFavorite = await prisma.favorites.create({
        data: {
          userId: parseInt(request.body.userId),
          petId: parseInt(request.body.petId),
        },
      });

      if (createFavorite) {
        response.status(201).json({
          success: true,
          favorite: createFavorite,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Favorite could not be created.",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/:userId", async (request, response) => {
  try {
    const findUserFavorites = await prisma.favorites.findMany({
      where: {
        userId: parseInt(request.params.userId),
      },
    });

    if (findUserFavorites) {
      response.status(200).json({
        success: true,
        favorite: findUserFavorites,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Favorite could not be found.",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

router.delete("/:petId", async (request, response) => {
  // console.log(req.user)
  try {
    const deleteFavorite = await prisma.favorites.deleteMany({
      where: {
        petId: parseInt(request.params.petId),
        // userId: parseInt(request.body.userId) 
      },
    });

    if (deleteFavorite) {
      response.status(200).json({
        success: true,
        deleted: deleteFavorite,
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Favorite could not be deleted.",
      });
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

export default router;
