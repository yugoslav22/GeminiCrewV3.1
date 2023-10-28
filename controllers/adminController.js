


const getAdminPage = (req,res) => {
    
    res.render("admin",{
        link: "admin"
    })
}




const createDaily = async(req,res) =>{

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename:true,
            folder: "GEMINICREW"
        }

    )


        


    try {
        const daily =await Daily.create({
            daily_name: req.body.daily_name,
            daily_place: req.body.daily_place,
            image_id:result.public_id
        })
        fs.unlinkSync(req.files.image.tempFilePath)
            res.status(201).redirect("/daily")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}



const getAddDailyPage = (req,res) => {
    
    res.render("add_daily",{
        link: "add_daily"
    })
}


export {getAdminPage,createDaily,getAddDailyPage}