// Import express
// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const sharp = require("sharp");

// // Create an express application
// const app = express();
// // Multer setup (assuming you have this set up already)
// const upload = multer({ dest: "uploads/" });

// // Load your model (adjust the path to your model if needed)
// // let model;
// // const loadModel = async () => {
// //   model = await tf.loadLayersModel("file://path/to/your/model/model.json");
// // };
// // loadModel().catch(console.error);

// // Prediction route
// app.post("/predict", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No image uploaded.");
//   }

//   try {
//     // Read and process the image
//     const imageBuffer = await sharp(req.file.path)
//       .resize(224, 224) // Adjust size according to your model's expected input
//       .toBuffer();
//     const tensor = tf.node
//       .decodeImage(imageBuffer, 3)
//       .expandDims(0)
//       .toFloat()
//       .div(tf.scalar(127.5))
//       .sub(tf.scalar(1));

//     // Make a prediction
//     const prediction = model.predict(tensor);
//     const predictedClass = prediction.argMax(-1).dataSync()[0]; // Simplified for demonstration

//     res.json({ prediction: predictedClass });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error processing image.");
//   }
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));

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

// //const upload = multer({ storage: storage }).single("image");

// // Use the `upload` middleware directly in your route
// app.post("/upload", (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       return res.status(500).json({ error: err.message });
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       return res
//         .status(500)
//         .json({ error: "An unknown error occurred when uploading." });
//     }

//     // Everything went fine.
//     res.json({
//       message: "File uploaded successfully",
//       filePath: req.file.path,
//     });
//   });
// });

// // Serve static files from the React app
// app.use(express.static("fashion-styling-frontend/build"));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
//   );
// });

// // Make the app listen on port 3000
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
//Import necessary libraries
// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const sharp = require("sharp");

// // Create an express application
// const app = express();

// // Set up bodyParser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the React app
// app.use(express.static("fashion-styling-frontend/build"));

// // Storage configuration for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// // Path to the TensorFlow model
// const modelPath =
//   "file:///Users/sumeyyasherief/my-fashion-styling-project/model-training/models/fashion_mnist_model.h5";

// // Load your model
// let model;
// const loadModel = async () => {
//   model = await tf.loadLayersModel(modelPath);
// };
// loadModel().catch(console.error);

// // Prediction route
// app.post("/predict", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No image uploaded.");
//   }

//   try {
//     // Read and process the image
//     const imageBuffer = await sharp(req.file.path)
//       .resize(224, 224) // Adjust size according to your model's expected input
//       .toBuffer();
//     const tensor = tf.node
//       .decodeImage(imageBuffer, 3)
//       .expandDims(0)
//       .toFloat()
//       .div(tf.scalar(127.5))
//       .sub(tf.scalar(1));

//     // Make a prediction
//     const prediction = model.predict(tensor);
//     const predictedClass = prediction.argMax(-1).dataSync()[0]; // Simplified for demonstration

//     res.json({ prediction: predictedClass });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error processing image.");
//   }
// });

// // Upload route
// app.post("/upload", (req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       return res.status(500).json({ error: err.message });
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       return res
//         .status(500)
//         .json({ error: "An unknown error occurred when uploading." });
//     }

//     // Everything went fine.
//     res.json({
//       message: "File uploaded successfully",
//       filePath: req.file.path,
//     });
//   });
// });

// // Catch-all handler for all other requests
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
//   );
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const sharp = require("sharp");
// const cors = require("cors");
// // const { createProxyMiddleware } = require("http-proxy-middleware");

// const app = express();
// app.use(cors()); // Apply CORS to all incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("fashion-styling-frontend/build"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// const modelPath =
//   "file:///Users/sumeyyasherief/my-fashion-styling-project/model-training/models/fashion_mnist_model.h5";
// let model;
// const loadModel = async () => {
//   model = await tf.loadLayersModel(modelPath);
// };
// loadModel().catch(console.error);

// app.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ error: "No file uploaded." });
//   }
//   let imageBuffer;
//   try {
//     imageBuffer = await sharp(req.file.path).resize(224, 224).toBuffer();
//   } catch (sharpError) {
//     console.error("Sharp error:", sharpError);
//     return res
//       .status(500)
//       .send({ error: "Failed to process image with Sharp." });
//   }

//   try {
//     // Process the image and predict
//     const imageBuffer = await sharp(req.file.path).resize(224, 224).toBuffer();
//     const tensor = tf.node
//       .decodeImage(imageBuffer, 3)
//       .expandDims(0)
//       .toFloat()
//       .div(tf.scalar(127.5))
//       .sub(tf.scalar(1));
//     const prediction = await model.predict(tensor);
//     const predictedClass = prediction.argMax(-1).dataSync()[0];

//     res.json({
//       message: "File uploaded and processed successfully",
//       filePath: `/uploads/${req.file.filename}`,
//       prediction: predictedClass,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Error processing image." });
//   }
// });
// // Setup proxy
// // app.use(
// //   "/predict",
// //   createProxyMiddleware({
// //     target: "http://localhost:5001", // Target host
// //     changeOrigin: true, // needed for virtual hosted sites
// //     pathRewrite: {
// //       "^/predict": "/", // rewrite path
// //     },
// //   })
// // );

// // app.post("/upload", upload.single("image"), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).send({ error: "No file uploaded." });
// //   }

// //   // Now the /upload endpoint should handle the file and then call /predict internally
// //   const formData = new FormData();
// //   formData.append("image", fs.createReadStream(req.file.path));

// //   // Use Axios to send a POST request to your own server's /predict path
// //   axios
// //     .post("http://localhost:3000/predict", formData, {
// //       headers: {
// //         ...formData.getHeaders(),
// //       },
// //     })
// //     .then((response) => {
// //       res.json(response.data);
// //     })
// //     .catch((error) => {
// //       console.error("Error processing image:", error);
// //       res.status(500).send({ error: "Error processing image." });
// //     });
// // });
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
//   );
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const sharp = require("sharp");
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3001", // Replace with the origin of your React app
// };
// app.use(cors(corsOptions));

// const app = express();
// //app.use(cors()); // Apply CORS to all incoming requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("fashion-styling-frontend/build"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// const modelPath =
//   "file:///Users/sumeyyasherief/my-fashion-styling-project/model-training/models/fashion_mnist_model.h5";
// let model;
// const loadModel = async () => {
//   model = await tf.loadLayersModel(modelPath);
// };
// loadModel().catch(console.error);

// app.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ error: "No file uploaded." });
//   }

//   try {
//     // Process the image and predict
//     const imageBuffer = await sharp(req.file.path).resize(28, 28).toBuffer();
//     const tensor = tf.node
//       .decodeImage(imageBuffer, 1) // Convert to grayscale
//       .toFloat()
//       .div(tf.scalar(255.0)) // Normalize pixel values
//       .reshape([1, 28, 28, 1]); // Reshape to match model input shape
//     const prediction = await model.predict(tensor);
//     const predictedClass = prediction.argMax(-1).dataSync()[0];

//     const labelsDescription = [
//       "T-shirt/top",
//       "Trouser",
//       "Pullover",
//       "Dress",
//       "Coat",
//       "Sandal",
//       "Shirt",
//       "Sneaker",
//       "Bag",
//       "Ankle Boot",
//     ];
//     const classLabel = labelsDescription[predictedClass];

//     res.json({
//       message: "File uploaded and processed successfully",
//       filePath: `/uploads/${req.file.filename}`,
//       class: classLabel,
//       confidence: prediction.dataSync()[0][predictedClass],
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).send({ error: "Error processing image." });
//   }
// });

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
//   );
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const sharp = require("sharp");
// const cors = require("cors");

// const app = express();
// const corsOptions = {
//   origin: "http://localhost:3000", // Replace with the origin of your React app
// };
// app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("fashion-styling-frontend/build"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// const modelPath =
//   "file:///Users/sumeyyasherief/my-fashion-styling-project/model-training/fashion_mnist_model.h5";
// let model;
// const loadModel = async () => {
//   model = await tf.loadLayersModel(modelPath);
// };
// loadModel().catch(console.error);

// app.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ error: "No file uploaded." });
//   }

//   try {
//     // Process the image and predict
//     const imageBuffer = await sharp(req.file.path).resize(28, 28).toBuffer();
//     const tensor = tf.node
//       .decodeImage(imageBuffer, 1) // Convert to grayscale
//       .toFloat()
//       .div(tf.scalar(255.0)) // Normalize pixel values
//       .reshape([1, 28, 28, 1]); // Reshape to match model input shape
//     const prediction = await model.predict(tensor);
//     const predictedClass = prediction.argMax(-1).dataSync()[0];

//     const labelsDescription = [
//       "T-shirt/top",
//       "Trouser",
//       "Pullover",
//       "Dress",
//       "Coat",
//       "Sandal",
//       "Shirt",
//       "Sneaker",
//       "Bag",
//       "Ankle Boot",
//     ];
//     const classLabel = labelsDescription[predictedClass];

//     res.json({
//       message: "File uploaded and processed successfully",
//       filePath: `/uploads/${req.file.filename}`,
//       class: classLabel,
//       confidence: prediction.dataSync()[0][predictedClass],
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).send({ error: "Error processing image." });
//   }
// });

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "fashion-styling-frontend/build", "index.html")
//   );
// });
// app.listen(3001, () => {
//   console.log("App running on http://localhost:3001");
// });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Adjust as needed

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

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }
  // Successful upload response
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

app.use(express.static("path_to_your_frontend_build_directory"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve("path_to_your_frontend_build_directory", "index.html")
  );
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
