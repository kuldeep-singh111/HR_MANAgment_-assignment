const express = require("express");
const { ConnectToDB } = require("./db")
const cookieParser = require("cookie-parser");
require('dotenv').config();
const router = require("./routes/route")
const cors = require("cors");


const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "https://hr-managment-rho.vercel.app",
    credentials: true,
}))
//" http://localhost:5173",

app.use(express.json());
app.use(cookieParser());


ConnectToDB(process.env.MONGO_URL).then(() => {
    console.log("Database is Connected....")
}).catch((error) => {
    console.log("Error in Mongodb Connection", error)
})

app.use(router);

app.listen(PORT, () => {
    console.log(`your server is started at ${PORT} PORT`)
})