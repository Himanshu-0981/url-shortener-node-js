const express = require("express");
const connection = require("./connect");
const urlRouter = require("./routers/url");

const app = express();
const PORT = 8080;

// connection
connection(`mongodb://127.0.0.1:27017/short-url`)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error", err));

app.use(express.json());
app.use("/", urlRouter);

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
