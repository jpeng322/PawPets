import express from "express";
import prisma from "../db/index.js";
import passport from "passport";
import cloudinary from "../cloudinary.js";
const router = express.Router();

//getting all the pets/posts
router.get("/", async (request, response) => {
  try {
    const allPets = await prisma.pet.findMany({
    });

    if (allPets) {
      response.status(200).json({
        success: true,
        message: "all pets fetched!",
        pet: allPets,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({
      success: false,
      message: "could not get any pet data!",
    });
  }
});

//getting pets by id
router.get("/:petId", async (request, response) => {
  // console.log(request.params.petId);
  try {
    const getPetsbyId = await prisma.pet.findFirst({
      where: {
        id: parseInt(request.params.petId),
      },
    });
    console.log(getPetsbyId)
    if (getPetsbyId) {
      response.status(200).json({
        success: true,
        message: "successfully fetched pet by id!",
        pet: getPetsbyId,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "something went wrong, could not fetch data",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({
      success: false,
      message: "Something went wrong, sorry!",
    });
  }
});

// posting a new pet after logging in
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    console.log(request.body);
    try {
      const newPet = await prisma.pet.create({
        data: {
          name: request.body.name || "",
          species: request.body.species,
          userId: request.user.id,
          petUsername: request.user.username || request.body.username,
          link: request.body.link,
          likes: 0,
        },
      });

      if (newPet) {
        const petsList = await prisma.pet.findMany({
          where: {
            userId: request.user.id,
          },
        });
        response.status(201).json({
          success: true,
          message: "Pet created",
          pet: newPet,
          petsList,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Pet was not created",
        });
      }
    } catch (e) {
      console.log(e);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

//updating a user's pet after logging in
router.put(
  "/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    // console.log(request.params.id, typeof request.params.id, request.user.id, typeof request.user.id)
    try {
      const updatePet = await prisma.pet.updateMany({
        where: {
          userId: request.user.id,
          id: parseInt(request.params.petId),
        },
        data: {
          name: request.body.name,
          species: request.body.species,
        },
      });

      if (updatePet) {
        const petsList = await prisma.pet.findMany({
          where: {
            userId: request.user.id,
          },
        });
        response.status(200).json({
          success: true,
          message: "Pet information was updated",
          petsList,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Pet not updated. Something failed.",
        });
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

//updating likes button
router.put(
  "/likes/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    // console.log(request.body);

    try {
      const updateLikes = await prisma.pet.updateMany({
        where: {
          id: parseInt(request.params.petId),
        },
        data: {
          likes: request.body.likes,
        },
      });

      if (updateLikes) {
        const updateLikesPet = await prisma.pet.findMany({
          where: {
            id: parseInt(request.params.petId),
          },
        });
        response.status(200).json({
          success: true,
          message: "Likes was updated",
          updateLikesPet,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Likes not updated. Something failed.",
        });
      }
    } catch (e) {
      console.log(e);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

router.post(
  "/likes/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    // console.log(request.user);
    console.log(request.body);
    try {
      const findLikeAlready = await prisma.likes.findMany({
        where: {
          // userId: request.user.id,
          userId: request.user.id,
          petId: parseInt(request.params.petId),
        },
      });

      if (findLikeAlready.length > 0) {
        if (findLikeAlready[0].liked === true) {
          const unlikePet = await prisma.likes.updateMany({
            where: {
              // userId: request.user.id,
              userId: request.user.id,
              petId: parseInt(request.params.petId),
              // liked: true,
            },
            data: {
              liked: false,
            },
          });

          const petUnlikedUpdate = await prisma.pet.update({
            where: {
              id: parseInt(request.params.petId),
            },
            data: {
              likes: request.body.likes - 1,
              // likes: {
              //   decrement: 1,
              // },
            },
          });

          const petUnlikedUpdateInfo = await prisma.likes.findFirst({
            where: {
              // userId: request.user.id,
              userId: request.user.id,
              petId: parseInt(request.params.petId),
              // liked: true,
            },
          });
          console.log(petUnlikedUpdate);
          response.status(200).json({
            success: true,
            liked: false,
            data: {
              // unlikePet,
              petUnlikedUpdate,
              petUnlikedUpdateInfo,
            },
          });
        } else {
          const likePet = await prisma.likes.updateMany({
            where: {
              // userId: request.user.id,
              userId: request.user.id,
              petId: parseInt(request.params.petId),
              // liked: true,
            },
            data: {
              liked: true,
            },
          });

          const petLikedUpdate = await prisma.pet.update({
            where: {
              id: parseInt(request.params.petId),
            },
            data: {
              likes: request.body.likes + 1,
              // likes: {
              //   increment: 1,
              // },
            },
          });

          const petLikedUpdateInfo = await prisma.likes.findFirst({
            where: {
              // userId: request.user.id,
              userId: request.user.id,
              petId: parseInt(request.params.petId),
              // liked: true,
            },
          });
          console.log(petLikedUpdate);

          response.status(200).json({
            success: true,
            liked: true,
            data: {
              // likePet,
              petLikedUpdate,
              petLikedUpdateInfo,
            },
          });
        }
        // response.status(400).json({
        //   success: false,
        //   message: "Like created already"
        // })
      } else {
        const initialLike = await prisma.likes.create({
          data: {
            // userId: request.user.id,
            userId: request.user.id,
            petId: parseInt(request.params.petId),
            liked: true,
          },
        });

        
      const addFirstLike = await prisma.pet.update({
        where: {
          id: parseInt(request.params.petId),
        },
        data: {
          likes: request.body.likes + 1,
        },
      })
        
        response.status(200).json({
          success: true,
          liked: true,
          initialLike,
          message: "Initial like",
        });
      }
;
    } catch (e) {
      console.log(e);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

//Get likes of user
router.get(
  "/likes/list",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const likedList = await prisma.likes.findMany({
        where: {
          userId: request.user.id,
        },
      });

      if (likedList) {
        response.status(200).json({
          success: true,
          message: "all likes fetched!",
          likedList,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({
        success: false,
        message: "could not get any pet data!",
      });
    }
  }
);

// Get pets by an owner
router.get("/user/:userId", async function (request, response) {
  const userId = parseInt(request.params.userId);
  try {
    const getPet = await prisma.pet.findMany({
      where: {
        userId: userId,
      },
      // include: {
      //     pets:true
      // }
    });

    response.status(200).json({
      sucess: true,
      getPet,
    });
  } catch (error) {
    console.log(error);
  }
});

// Get any pets that belong to a specific species
router.get("/species/:species", async (request, response) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        species: request.params.species,
      },
    });

    response.status(200).json({
      sucess: true,
      data: pets,
    });
  } catch (error) {
    console.log(error);
  }
});

// User can get their own pets
router.get(
  "/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const petId = parseInt(request.params.petId);
    console.log(request.user);

    const getPetbyOwner = await prisma.pet.findMany({
      where: {
        AND: [{ userId: request.user.id }, { id: petId }],
      },
    });
    console.log(getPetbyOwner.length);

    if (getPetbyOwner.length == 0) {
      response.status(404).json({
        success: false,
        message: "pet not found for user",
      });
    } else {
      response.status(200).json({
        sucess: true,
        data: getPetbyOwner,
      });
    }
  }
);

//users can delete their pets after logging in
router.delete(
  "/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const deletePet = await prisma.pet.deleteMany({
        where: {
          userId: request.user.id,
          id: parseInt(request.params.petId),
        },
      });

      const deleteLikes = await prisma.likes.deleteMany({
        where: {
          petId: parseInt(request.params.petId),
        },
      });
      if (deletePet && deleteLikes) {
        const newPets = await prisma.pet.findMany({
          where: {
            userId: request.user.id,
          },
        });
        response.status(200).json({
          success: true,
          message: "Pet was successfully deleted!",
          petsList: newPets,
        });
      } else {
        response.status(400),
          json({
            message: "Something went wrong, pet could not be deleted!",
          });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  }
);

//users can delete their pets after logging in
router.delete(
  "/likes/delete/:petId",
  passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    try {
      const deleteLikes = await prisma.likes.deleteMany({
        where: {
          petId: parseInt(request.params.petId),
        },
      });
      if (deleteLikes) {
        const newPets = await prisma.pet.findMany({
          where: {
            userId: request.user.id,
          },
        });
        response.status(204).json({
          success: true,
          message: "Pet was successfully deleted!",
          petsList: newPets,
        });
      } else {
        response.status(400),
          json({
            message: "Something went wrong, pet could not be deleted!",
          });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  }
);

export default router;
