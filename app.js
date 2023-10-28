import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import dailyRoute from "./routes/dailyRoute.js"
import userRoute from "./routes/userRoute.js"
import adminRoute from "./routes/adminRoute.js"
import cookieParser from "cookie-parser"
import methodOverride from "method-override"
import {checkUser } from "./middlewares/authMiddleware.js"
// import {checkUser } from "./middlewares/authMiddleware2.js"
import FileUpload from "express-fileupload"
import {v2 as cloudinary} from "cloudinary"
import fileUpload from "express-fileupload"

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})
conn()

const app = express()
const port= process.env.PORT


app.set("view engine","ejs")


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({useTempFiles:true}))
app.use(methodOverride("_method",{
    methods: ["POST","GET"],
}))

app.get('/set-user-cookie', (req, res) => {
    // Kullanıcıya "user" tokeni atanıyor
    res.cookie('token', userToken);
    res.send('User token oluşturuldu ve cookie\'ye kaydedildi.');
  });
  
app.get('/set-admin-cookie', (req, res) => {
    // Kullanıcıya "admin" tokeni atanıyor
    res.cookie('token', adminToken);
    res.send('Admin token oluşturuldu ve cookie\'ye kaydedildi.');
});




app.use("*",checkUser)
app.use("/",pageRoute)
app.use("/photos",photoRoute)
app.use("/users",userRoute)
app.use("/daily",dailyRoute)
app.use("/admin",adminRoute)






app.listen(port, () =>{
    console.log(`Application running on port ${port}`)

})

