import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const checkUser = async(req,res,next) =>{
  const token = req.cookies.jwt

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, async (err,decodedToken)=>{
      if(err){
        console.log(err.message)
        res.locals.user = null
        next()
      }else{
        const user = await User.findById(decodedToken.userId)
        
        res.locals.user = user

        req.user = {
          ...decodedToken,
          role: user.role,
        };
        // console.log("req.user.role",req.user.role)
        next()
        
      }
      
    })
  }else{
    res.locals.user = null
        next()
  }
}




const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
      
    if(token){
      jwt.verify(token,process.env.JWT_SECRET,(err)=>{
        if(err){
          console.log(err.message)
          res.redirect("/login")
        }else{
          
          next()
          
        }
      })
    }else{
      res.redirect("/login")
    }
  } catch (error) {
    res.status(401).json({
        succeded: false,
        error: "Not authorized"
    })
  }
};



const authAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
    
  } else {
    
    res.sendStatus(403) // Admin yetkisi olmayanları reddet
  }
};
export { authenticateToken , checkUser,authAdmin};
