# File Upload with Multer

## Project Setup

- Create a directory 'ProjectName'
- Go into the directory `cd ProjectName`
- Initialize a new Node.js project: `npm init -y`
- Install Express: `pnpm i express`
- Install Multer: `pnpm i multer`
- Edit the package.json file
  - Add the scripts
    ```package.json
    "scripts": {
        "start": "node --env-file=/.env server",
        "dev": "node --watch --env-file=/.env server"
    },
    ```
  - Change the type to 'Module' (if you want to use import instead of require)
    `package.json
"type": "module",
`
- Add the following directories
  - config
  - public

## Start Express Server

- Create a file called .env

```.env
PORT=5000
```

- Create a file called server.js

```js
import express from "express";

const app = express();

// simple get request example
app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});
s;
// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

- you can now run the server `npm run dev` or `npm run start`
  - for development use `npm run dev` as it will update the server everytime you save

## Static Folder Setup

- Our public directory that we created earlier will be used as the static folder
  - It will be used later on to serve static files to the client
- In our 'server.js' add:

  ```js
  import path from "path";
  import { fileURLToPath } from "url"; // only for ES Modules

  // this is only for when using ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "public")));
  ```

## Multer Config

- In the directory 'config' create a file called multerConfig.js

  ```js
  import path from "path";
  import multer from "multer";

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const originalName = path.parse(file.originalname).name;
      const extension = path.extname(file.originalname);
      cb(null, originalName + "-" + uniqueSuffix + extension);
    },
  });

  const upload = multer({ storage: storage });

  export default upload;
  ```

- Now in server.js add the following route:

  ```js
  app.post("/upload", upload.single("file"), (req, res) => {
    res.send(
      `File uploaded to: <a href="/uploads/${req.file.filename}">${req.file.filename}</a>`
    );
  });
  ```

- In the public folder create a file called 'index.html'

  - create a form to upload files

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>File Upload Form</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            action="/upload"
            method="post"
            enctype="multipart/form-data"
            class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          >
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Upload File</h2>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="file"
              >
                Select file
              </label>
              <input
                type="file"
                name="file"
                id="file"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="submit"
                value="Upload File"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </body>
    </html>
    ```

- Lastly in the 'public' directory create another directory called 'uploads'
