import { Router } from "express";
import checkJwt from "../../middlewares/check-jwt";
import {
  createPostSchema,
  deletePostSchema,
  getAllPostSchema,
  getPostByIdSchema,
  updatePostSchema,
} from "../../dtos/post.dto";
import {
  createController,
  deleteController,
  getAllController,
  getByIdController,
  updateController,
} from "../../controllers/post";
import { validator } from "../../middlewares/validator";

const router = Router();

// getAll
router.get("/", [validator(getAllPostSchema)], getAllController);
// getById
router.get("/:id", [validator(getPostByIdSchema)], getByIdController);
// create
router.post("/", [checkJwt, validator(createPostSchema)], createController);
// update
router.put("/:id", [checkJwt, validator(updatePostSchema)], updateController);
// delete
router.delete(
  "/:id",
  [checkJwt, validator(deletePostSchema)],
  deleteController
);

export default router;
