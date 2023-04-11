import express from "express";
const router = express.Router();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import cloudinary from "../cloudinary.js";

// const appDir = dirname(require.main.filename);

router.post("/pics", (request, response) => {
  console.log(request.headers);
  try {
    response.status(200).json({
      success: true,
    });
  } catch (e) {
    response.status(400).json({
      success: false,
    });
    console.log(e);
  }
});

router.post("/upload", async (req, res) => {
  
  const data = req.body.data

  if (req.files === null) {
    return res.status(400).json({
      message: "No file uploaded.",
    });
  }


  const cloudRes = cloudinary.uploader.upload(data.imageUrl, {
    folder: "Pawpets",
  });

  cloudRes
    .then((data) => {
      console.log("CLOUDINARY DATA");
      res.status(200).json({
        link: data.secure_url,
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });

  // res.json({ fileName: file.name, filePath: `/public/${file.name}` });
});

export default router;
