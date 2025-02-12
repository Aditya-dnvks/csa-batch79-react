const express = require("express");
const cors = require("cors");
const app = express();
const mongoDBConnection = require("./dbConfig/dbConfig");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;
mongoDBConnection(mongoUrl);

const csaRoutes = require("./routes/csaRoutes");
app.use("/csa", csaRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running in ${PORT} successfully`));

//RESTful APIs

// app.METHOD("route", handler);
//C - Post
//R - Get
//U - Put
//D - Delete

//MVC Architecture --->
