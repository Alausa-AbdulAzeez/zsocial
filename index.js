const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const path = require("path");
const multer = require("multer");

dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to the DB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

// // Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
console.log(`storage${storage}`);
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file upload successful");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(express.static(path.resolve(__dirname, "./client2/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client2/build", "index.html"));
});

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
