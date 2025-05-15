const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const mainRouter = require ("./routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
app.use(mainRouter);

module.exports = app;