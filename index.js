require("dotenv");
const express = require("express");
const path = require("path");
const connection = require("./connect");
const urlRouter = require("./routers/url");
const staticRoute = require("./routers/staticRouter");

const app = express();
const PORT = process.env.PORT;

// connection
connection(`mongodb://127.0.0.1:27017/short-url`)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error", err));

// setting the view engine to ejs

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", urlRouter);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
