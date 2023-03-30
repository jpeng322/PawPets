import express from "express";
const router = express.Router();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

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

router.post("/upload", (req, res) => {
  //   console.log(req.files, "THIS IS THE FILE");
  if (req.files === null) {
    return res.status(400).json({
      message: "No file uploaded.",
    });
  }

  const file = req.files.file;

  const frontendRoute = __dirname
    .replace("backend", "frontend")
    .replace("routes", "images");
  // .replace("routes", "public");
  file.mv(`${frontendRoute}/${file.name}`, (err) => {
    console.log(frontendRoute);
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

  res.json({ fileName: file.name, filePath: `/images/${file.name}` });
});

export default router;
