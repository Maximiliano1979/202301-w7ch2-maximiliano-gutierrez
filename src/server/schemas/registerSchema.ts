import { Joi } from "express-validation";

const registerSchema = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(8).max(16).required(),
  }),
};

export default registerSchema;
