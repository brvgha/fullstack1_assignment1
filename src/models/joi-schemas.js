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

export const UserCredentialSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret1234?").required(),
  })
  .label("UserCredentials");

export const UserCredentialsArray = Joi.array()
  .items(UserCredentialSpec)
  .label("UserCredentialsArray");

export const infoSpec = Joi.object()
  .keys({
    category: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    analytics: Joi.string().allow("").optional(),
    placemarkid: IdSpec
  })
  .label("InfoSpec")

export const infoSpecExt = infoSpec.keys({
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("InfoSpecExt")

export const infoSpecArray = Joi.array()
  .items(infoSpecExt)
  .label("infoSpecArray");

export const placeMarkSpec = Joi.object()
  .keys({
    name: Joi.string().example("Cork City").required(),
    userid: IdSpec,
    info: infoSpecArray
  })
  .label("PlaceMarkSpec");

export const placeMarkSpecExt = placeMarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
});

export const placeMarkSpecArray = Joi.array()
  .items(placeMarkSpec)
  .label("placeMarkSpecArray");

