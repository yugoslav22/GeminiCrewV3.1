import mongoose from "mongoose"
import bcrypt, { hash } from "bcrypt"
import validator from "validator"

const {Schema} = mongoose

const userSchema = new Schema ({
    user_name: {
        type: String,
        required: [true,"Username area is required."],
        uniqie: true,
        validate: [validator.isAlphanumeric,"Only alphanumeric characters."]

    },
    user_email: {
        type: String,
        required: [true,"Email area is required."],
        uniqie: true,
        validate:[validator.isEmail,"Vaid email is required."]
    },
    user_password: {
        type: String,
        required: [true,"Password area is required."],
        minLength:[4,"At least 4 characters"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    followers:[
        {
            type: Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    followings:[
        {
            type: Schema.Types.ObjectId,
            ref:"User",
        },
    ],
},
{
    timestamps: true
})

userSchema.pre("save", function(next){
    const user = this
    
    bcrypt.hash(user.user_password,10, (err,hash)=>{
        user.user_password = hash
        
        next()
    })
})

const User= mongoose.model("User", userSchema)

export default User