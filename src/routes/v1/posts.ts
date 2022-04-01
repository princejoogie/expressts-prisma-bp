import { Router } from "express";
import checkJwt from "../../middlewares/check-jwt";
import { createPostSchema } from "../../dtos/post.dto";
import {
  updateController,
  createController,
  getAllController,
} from "../../controllers/post";
import { validator } from "../../middlewares/validator";

const router = Router();

/**
 * TODO:
 *  - [ ] create
 *  - [ ] getAllPosts
 *  - [ ] getById
 *  - [ ] update
 *  - [ ] delete
 */

// create
router.post("/", [checkJwt, validator(createPostSchema)], createController);
// getAll
router.get("/", [checkJwt], getAllController);
// getById
// update
router.put("/:id", checkJwt, updateController);
// delete

export default router;
