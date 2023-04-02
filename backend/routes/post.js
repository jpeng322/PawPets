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
  //   console.log(req.files, "THIS IS THE FILE");
  // console.log(req.body, req.files);
  if (req.files === null) {
    return res.status(400).json({
      message: "No file uploaded.",
    });
  }

  // const file = req.files.file;
  // console.log(req.body.data.imageUrl);

  // const frontendRoute = __dirname
  //   .replace("backend", "frontend")
  //   .replace("routes", "public");
  // // .replace("routes", "public");
  // await file.mv(`${frontendRoute}/${file.name}`, (err) => {
  //   console.log(frontendRoute);
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).send(err);
  //   }
  // });

  // console.log(file.name)

  const cloudRes = cloudinary.uploader.upload(req.body.data.imageUrl, {
    folder: "Pawpets",
  });

  cloudRes
    .then((data) => {
      console.log("THIS IS DATA");
      // console.log(data);
      // console.log(data.secure_url);
      res.status(200).json({
        link: data.secure_url,
      });
    })
    .catch((err) => {
      console.log("ERROROERROERER");
      console.log(err);
    });

  // res.json({ fileName: file.name, filePath: `/public/${file.name}` });
});

export default router;
