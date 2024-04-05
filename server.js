// Import express
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");

// Create an express application
const app = express();
// Multer setup (assuming you have this set up already)
const upload = multer({ dest: "uploads/" });

// Load your model (adjust the path to your model if needed)
let model;
const loadModel = async () => {
  model = await tf.loadLayersModel("file://path/to/your/model/model.json");
};
loadModel().catch(console.error);

// Prediction route
app.post("/predict", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image uploaded.");
  }

  try {
    // Read and process the image
    const imageBuffer = await sharp(req.file.path)
      .resize(224, 224) // Adjust size according to your model's expected input
      .toBuffer();
    const tensor = tf.node
      .decodeImage(imageBuffer, 3)
      .expandDims(0)
      .toFloat()
      .div(tf.scalar(127.5))
      .sub(tf.scalar(1));

    // Make a prediction
    const prediction = model.predict(tensor);
    const predictedClass = prediction.argMax(-1).dataSync()[0]; // Simplified for demonstration

    res.json({ prediction: predictedClass });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing image.");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//const upload = multer({ storage: storage }).single("image");

// Use the `upload` middleware directly in your route
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res
        .status(500)
        .json({ error: "An unknown error occurred when uploading." });
    }

    // Everything went fine.
    res.json({
      message: "File uploaded successfully",
      filePath: req.file.path,
    });
  });
});

// Serve static files from the React app
app.use(express.static("fashion-styling-frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
  );
});

// Make the app listen on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors()); // Enable CORS
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Files will be saved in the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// app.post("/uploads", (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ error: err.message });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ error: "An unknown error occurred when uploading." });
//     }

//     // Everything went fine, return the relative URL to the uploaded file
//     res.json({
//       message: "File uploaded successfully",
//       filePath: `/uploads/${req.file.filename}`, // Change made here
//     });
//   });
// });

// app.use(express.static("fashion-styling-frontend/build"));
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend", "build", "index.html")
//   );
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
