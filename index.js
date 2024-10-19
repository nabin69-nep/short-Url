const express = require("express");
const app = express();
const port = 8000;
const urlRoute = require("./routes/url");
const path = require("path");
const { connectDb } = require("./connect");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//ejs connection
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//routes
app.use("/url", urlRoute);
app.use("/", staticRouter);
//mongodb connection
connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("err", err));

//server started
app.listen(port, () => console.log("Server Started at Port : ", port));
