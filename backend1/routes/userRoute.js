import express from "express"
import { allBookings, bookVisit, cancelBooking, createUser, getAllFav, toFav } from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0config.js";
// import jwtCheck from "../config/auth0config.js";
// import { createUser } from "../controller/userCntrl.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser)
router.post("/bookVisit/:id", jwtCheck, bookVisit)
router.post("/allBookings", allBookings)
router.post("/removeBooking/:id", jwtCheck, cancelBooking)
router.post("/toFav/:rid", jwtCheck, toFav)
router.post("/allFav", jwtCheck, getAllFav)

export { router as userRoute }