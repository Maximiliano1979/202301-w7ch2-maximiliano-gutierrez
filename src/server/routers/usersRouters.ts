import { Router } from "express";
import loginUser, { registerUser } from "../controllers/usersControllers.js";
import { validate } from "express-validation";
import registerSchema from "../schemas/registerSchema.js";
import multer from "multer";

const usersRouter = Router();

usersRouter.post(
  "/login",
  validate(registerSchema, {}, { abortEarly: false }),
  loginUser
);

const upload = multer({ dest: "uploads/" });

usersRouter.post("/register", upload.single("image"), registerUser);

export default usersRouter;
