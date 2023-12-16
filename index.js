const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
//rest object


const cors = require("cors")

//routes import
const authRoutes= require('./routes/authRoutes.js');
const productroute = require('./routes/productRoutes.js')


//configure evv
dotenv.config();


const {connectDB} = require("./config/db.js");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

const PORT =process.env.PORT || 9000


const app= express();





//middlewares
app.use(morgan())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors({
    origin:'*'
}))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product',productroute );



//rest api
app.get("/", (req,res)=>{
    res.send("<h1>Welcome to ECommerce Website</h1>");
})


app.use(notFound)
app.use(errorHandler)
app.listen(PORT, async()=>{
    try{
        await connectDB()
        console.log(`Server runnig on ${process.env.DEV_MODE} mode on port ${PORT}`);
    }
    catch(err){
        console.log(err, "error while loading");
    }

});