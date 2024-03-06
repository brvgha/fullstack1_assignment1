import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret1234?").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const placeMarkSpec = {
  name: Joi.string().required(),
};
export const infoSpec = {
  category: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  analytics: Joi.string().allow("").optional(),
};