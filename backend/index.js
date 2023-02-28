const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config()
const app = express();
const PORT = 5000;
const urlMongoose = process.env.UrlMongoose;

// ngan chan loi cors....
app.use(cors());
// Tao cookie va gan cookie
app.use(cookiePaser());
//Tat ca res deu duoi dang json
app.use(express.json())
//limit se gioi han toi da dung luong ma phia client co the submit len server
// app.use(bodyParser.json({limit: '30mb'}));
// app.use(bodyParser.urlencoded({extended : true , limit :'30mb'}));

//ROUTES
app.use("/v1/auth" , authRoute);
app.use("/v1/user" , userRoute);

mongoose.connect(urlMongoose ,()=>{
    console.log("Connected to MongooseDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
    })
})

// Tao Authentication : check tt login (ss du lieu nhap vs DB co san)
// Tao Authorization : Chuc nang phan quyen (la ai , co quyen lam gi)


