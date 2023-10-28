// import User from "../models/userModel.js"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// import Photo from "../models/photoModel.js"




// const createUser = async (req,res) =>{
//     try {
//         const user =await User.create(req.body)
//         res.redirect("/login")
        
//         } catch (error) {



//             let errors2 = {}

//             if(error.code===11000){
//                 errors2.email = "The email has already registered"
//             }

//             if (error.name === "ValidationError"){
//                 Object.keys(error.errors).forEach((key)=>{
//                     errors2[key]  = error.errors[key].message
//                 })
//             }

//             console.log("errors2:" ,errors2)
//             res.status(400).json(errors2)
//         }
// }



// // const loginUser = async (req,res) =>{
// //     try {
        
// //         const {user_name, user_password} = req.body

// //         const user = await User.findOne({user_name})

// //         let same = false

// //         if(user){
// //             same = await bcrypt.compare(user_password, user.user_password)
// //         } else {
// //             return res.status(401).json({
// //                 succeded: false,
// //                 error:"There is no such user",
// //              })
// //         }

// //         if(same) {

// //             const token = jwt.sign({ id: user._id, role: user.role }, secretKey);
// //                 res.json({ token });
// //             res.redirect("/users/dashboard")
// //         } else{
// //             res.status(401).json({
// //                 succeded: false,
// //                 error:"Passwords are not matched.",
// //             })
// //         }

// //         } catch (error) {
// //             res.status(500).json({
// //                 succeded: false,
// //                 error,
// //              })
// //         }
// // }


// const loginUser = async (req,res) =>{
//     try {
        
//         const {user_name, user_password} = req.body

//         const user = await User.findOne({user_name})

//         let same = false

//         if(user){
//             same = await bcrypt.compare(user_password, user.user_password)
//         } else {
//             return res.status(401).json({
//                 succeded: false,
//                 error:"There is no such user",
//              })
//         }

//         if(same) {

//             const token= createToken(user._id)
//             res.cookie("jwt",token,{
//                 httpOnly:true,
//                 maxAge:1000*60*60*24,
//             })
//             res.redirect("/users/dashboard")
//         } else{
//             res.status(401).json({
//                 succeded: false,
//                 error:"Passwords are not matched.",
//             })
//         }

//         } catch (error) {
//             res.status(500).json({
//                 succeded: false,
//                 error,
//              })
//         }
// }


// const userToken = (userId) =>{
//     return jwt.sign({userId},process.env.JWT_SECRET,{
//         expiresIn:"1d",
//     })
// }

// const adminToken = (userId) =>{
//   return jwt.sign({userId},process.env.JWT_SECRET,{
//       expiresIn:"1d",
//   })
// }



// const getDashboardPage = async (req,res) =>{
//     const photos = await Photo.find({user: res.locals.user._id})
//     const user = await User.findById({_id : res.locals.user._id}).populate(["followers","followings",])
//     res.render("dashboard", {
//         link:"dashboard",
//         photos,
//         user,
//     })
// }



// // const createToken = (userId) =>{
// //      return jwt.sign({userId},process.env.JWT_SECRET,{
// //          expiresIn:"1d", }) } 
// //                                                                                                          you can modify this like the below one 
// // const createToken = (userId, role) =>{
// //     return jwt.sign({userId, role},process.env.JWT_SECRET,{
// //         expiresIn:"1d", }) }







// const getAllUsers = async(req,res) =>{
//     try {
//         const users = await User.find({ _id: {$ne : res.locals.user._id}})
//         res.status(200).render("users", {
//             users,
//             link: "users",
//         })
//     } catch (error) {
//         res.status(500).json({
//             succeded:false,
//             error,
//         })
//     }
// }





// const getAUser = async(req,res) =>{
//     try {
        
//         const user = await User.findById({_id : req.params.id})


//         const inFollowers = user.followers.some((follower)=>{
//             return follower.equals(res.locals.user._id)
//         })

//         const moment_user = await User.findById({_id : res.locals.user._id})
//         const photos = await Photo.find({user: user._id})
//         res.status(200).render("user", {
//             user,
//             moment_user,
//             photos,
//             link: "users",
//             inFollowers,
//         })
//     } catch (error) {
//         res.status(500).json({
//             succeded:false,
//             error,
//         })
//     }
// }
    



// const follow = async(req,res) =>{
//     try {
//         let user = await User.findByIdAndUpdate(
//             {_id: req.params.id},
//             {
//                 $push: {followers: res.locals.user._id},
//             },
//             {new:true}
//             )
//         user = await User.findByIdAndUpdate(
//             {_id: res.locals.user._id},
//             {
//                 $push: {followings: req.params.id},
//             },
//             {new:true}
//         )
//         res.status(200).redirect(`/users/${req.params.id}`)
        
//     } catch (error) {
//         res.status(500).json({
//             succeded:false,
//             error,
//         })
//     }
// }
 







// const unfollow = async(req,res) =>{
//     try {
//         let user = await User.findByIdAndUpdate(
//             {_id: req.params.id},
//             {
//                 $pull: {followers: res.locals.user._id},
//             },
//             {new:true}
//             )
//         user = await User.findByIdAndUpdate(
//             {_id: res.locals.user._id},
//             {
//                 $pull: {followings: req.params.id},
//             },
//             {new:true}
//         )
//         res.status(200).redirect(`/users/${req.params.id}`)
//     } catch (error) {
//         res.status(500).json({
//             succeded:false,
//             error,
//         })
//     }
// }




// export {createUser,loginUser,getDashboardPage,getAllUsers,getAUser,follow,unfollow}