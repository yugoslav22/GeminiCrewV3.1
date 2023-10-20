import mongoose from "mongoose"

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "GeminiCrewV3",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to DB. Database is in process.")
    }).catch((err)=>{
        console.log(`DB connection err: ${err}`)
    })
}

export default conn