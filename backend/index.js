const express=require("express")
const { default: mongoose } = require("mongoose")
const app= express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const chatRoute = require("./routes/chats")

//database
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully")
    }
    catch(err){
        console.log(err)
    } 
}  

//middlewares
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/chat",chatRoute)

app.use(express.static("images"))

// Image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); // Specify the destination directory where files should be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const upload = multer({ storage: storage });  

app.post("/api/upload", upload.single("file"), (req, res) => {
   console.log(req.body)
    // Handle file upload here
    res.status(200).json("Image has been uploaded successfully!");
});



app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port 5000")
})