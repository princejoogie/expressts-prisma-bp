import { Router } from "express";
import { updateController } from "../../controllers/post";
import checkJwt from "../../middlewares/check-jwt";

const router = Router();

router.post("/update", checkJwt, updateController);

export default router;
