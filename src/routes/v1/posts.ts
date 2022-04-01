import { Router } from "express";
import checkJwt from "../../middlewares/check-jwt";
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "../../dtos/post.dto";
import {
  createController,
  deleteController,
  getAllController,
  updateController,
} from "../../controllers/post";
import { validator } from "../../middlewares/validator";

const router = Router();

/**
 * TODO:
 *  - [x] create
 *  - [x] getAllPosts
 *  - [ ] getById
 *  - [x] update
 *  - [x] delete
 */

// create
router.post("/", [checkJwt, validator(createPostSchema)], createController);
// getAll
router.get("/", getAllController);
// update
router.put("/:id", [checkJwt, validator(updatePostSchema)], updateController);
// delete
router.delete(
  "/:id",
  [checkJwt, validator(deletePostSchema)],
  deleteController
);
// getById

export default router;
