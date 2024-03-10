import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret1234?").required(),
    type: Joi.string().optional()
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails")

export const UserSpecExt = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  
}).label("UserDetailsExt");

export const UserUpdateSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    password: Joi.string().example("secret1234").required(),
  })
  .label("UserUpdateDetails")

export const UserArray = Joi.array().items(UserSpecExt).label("UserArray");

export const infoSpec = Joi.object()
  .keys({
    description: Joi.string().allow("").optional().example("Connects Street X to Street Y"),
    category: Joi.string().required().example("Bridge"),
    analytics: Joi.number().allow("").optional().example(900),
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
    name: Joi.string().example("The Elysian").required(),
    city: Joi.string().example("Cork").required(),
    country: Joi.string().example("Ireland").required(),
    img: Joi.string().optional().allow(""),
    userid: IdSpec,
    infos: infoSpecArray
  })
  .label("PlaceMarkSpec");

export const placeMarkSpecExt = placeMarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaceMarkExt")

export const placeMarkSpecArray = Joi.array().items(placeMarkSpecExt).label("placeMarkSpecArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

