import express from "express";
import prisma from "../db/index.js";
const router = express.Router();
import passport from "passport";

router.post("/", async (request, response) => {
  try {
    const createFavorite = await prisma.favorites.create({
      data: {
        userId: request.body.userId,
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
  } catch (e) {
    console.log(e);
  }
});


router.get("/:userId", async (request, response) => {
  try {
    const findUserFavorites = await prisma.favorites.findMany({
        where: {
    userId: parseInt(request.params.userId)
}
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
  }
});

export default router;
