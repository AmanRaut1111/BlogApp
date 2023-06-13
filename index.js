const express = require("express");
const app = express();
const db = require("./config/db");
const dotenv = require("dotenv");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const Postrouter = require("./routers/post");
const CatRouter = require("./routers/categories");
const bodyParser = require("body-parser");

dotenv.config();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", Postrouter);
app.use("/cat", CatRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
