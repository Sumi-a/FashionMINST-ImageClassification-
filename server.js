const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: "*" })); // Adjust the CORS policy as needed

// Setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Serve static files from the React app build directory
app.use(
  express.static(path.join(__dirname, "fashion-styling-frontend", "build"))
);

// The "catchall" handler to serve index.html
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "fashion-styling-frontend", "build", "index.html")
  );
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
