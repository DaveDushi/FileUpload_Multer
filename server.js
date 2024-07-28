import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import upload from "./config/multerConfig.js";

const app = express();

// Set up static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded succesfully");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
