import { Router } from "express";
import { updateController, createController } from "../../controllers/post";
import { createPostSchema } from "../../dtos/post.dto";
import checkJwt from "../../middlewares/check-jwt";
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
// getById
// update
router.put("/:id", checkJwt, updateController);
// delete

export default router;
