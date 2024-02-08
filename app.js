require("dotenv").config();
require('express-async-errors')

const morgan = require("morgan")
const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//routers
const authRouter = require("./routers/authRoutes")

const notFounMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use('/auth', authRouter)

app.use(notFounMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
