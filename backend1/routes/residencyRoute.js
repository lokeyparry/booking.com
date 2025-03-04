import express from "express"
import { createResidency, getAllResidencies, getResidency } from "../controllers/residencyCntrl.js";
import jwtCheck from "../config/auth0config.js";
// import { createResidency } from "../controller/residencyCntrl.js";

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allresd", getAllResidencies)
router.get("/:id", getResidency)

export { router as residencyRoute }