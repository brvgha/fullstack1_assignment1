import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const placeMarkSpec = {
  name: Joi.string().required(),
};
export const infoSpec = {
  category: Joi.string().required(),
  description: Joi.string().required(),
  analytics: Joi.string().required(),
};