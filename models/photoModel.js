import mongoose from "mongoose"

const {Schema} = mongoose

const photoSchema = new Schema ({
    photo_name: {
        type: String,
        required: true,
        trim: true
    },
    photo_description: {
        type: String,
        required: true,
        trim: true
    },
    photo_uploadedAt: {
        type: Date,
        default:Date.now,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    url:{
        type:String,
        required:true,
        
    },
    image_id:{
        type:String,

    },
})

const Photo= mongoose.model("Photo", photoSchema)

export default Photo