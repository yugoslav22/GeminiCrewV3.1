import mongoose from "mongoose"
import bcrypt, { hash } from "bcrypt"


const {Schema} = mongoose

const DailySchema = new Schema ({
    daily_name: {
        type: String,
        required: [true,"Username area is required."],
        uniqie: true,
        

    },
    daily_place: {
        type: String,
        required: [true,"Email area is required."],
        uniqie: true,
        
    },
    image_id:{
        type:String,

    },

})
const Daily= mongoose.model("Daily", DailySchema)

export default Daily