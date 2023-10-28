import express from "express"
import * as adminController from "../controllers/adminController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"
import * as dailyController from "../controllers/dailyController.js"

const router = express.Router()



router.route("/").get(adminController.getAdminPage)
router.route("/daily/add").post(adminController.createDaily).get(adminController.getAddDailyPage)



export default router