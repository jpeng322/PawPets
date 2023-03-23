import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

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
    console.log(__dirname );
    // C:\Users\Jason\repos\TKH-phase2\TKH-Phase2-Project\frontend
  file.mv(`C:/Users/Jason/repos/TKH-phase2/TKH-Phase2-Project/frontend/public/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});

export default router;
