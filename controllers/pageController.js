import User from "../models/userModel.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"


const getIndexPage = (req,res) => {
    
    res.render("index",{
        link: "index"
    })
}




const getAboutPage = async (req,res) =>{

   

    const user = await User.findById({_id : res.locals.user._id})
    res.render("about", {
        link:"about",
        user,
    })
   
}




const getRegisterPage = (req,res) =>{
    res.render("register", {
        link:"register"
    })
}





const getLoginPage = (req,res) =>{
    res.render("login", {
        link:"login"
    })
}

const getLogout = (req,res) =>{
    res.cookie("jwt","",{
        maxAge:1,
    })
    res.redirect("/")
}



export {getIndexPage, getAboutPage,getRegisterPage,getLoginPage,getLogout}