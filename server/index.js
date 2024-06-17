const express = require("express");
const dbConnection = require("./config/database");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const cloudinaryConnect = require("./config/cloudinary");
const CourseRoutes = require("./routes/Course");
const PaymentsRoutes = require("./routes/Payments");
const ProfileRoutes = require("./routes/Profile");
const CartRoutes = require("./routes/Cart");
const UserRoutes = require("./routes/User");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
require("dotenv").config();
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api", PaymentsRoutes);
app.use("/api", ProfileRoutes);
app.use("/api", CourseRoutes);
app.use("/api", UserRoutes);
app.use("/api", CartRoutes);


const PORT = process.env.PORT || 4000;

dbConnection();

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
cloudinaryConnect();
app.get("/", (req, res) => {
  res.send("<h1>running mega 3 project</h1>");
});
