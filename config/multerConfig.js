import path from "path";
import multer from "multer";

let count = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = count++;
    const fileName = "image";
    const extension = path.extname(file.originalname);
    cb(null, fileName + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

export default upload;
