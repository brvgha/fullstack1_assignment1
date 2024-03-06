import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { infoSpec, infoSpecArray, infoSpecExt, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const infoApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.getAllInfos();
        return info;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: infoSpecArray, failAction: validationError },
    description: "Get all infoApi",
    notes: "Returns all infoApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const info = await db.infoStore.getInfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No info with this id");
        }
        return info;
      } catch (err) {
        return Boom.serverUnavailable("No info with this id");
      }
    },
    tags: ["api"],
    description: "Find a Info",
    notes: "Returns a info",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: infoSpecExt, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.addInfo(request.params.id, request.payload);
        if (info) {
          return h.response(info).code(201);
        }
        return Boom.badImplementation("error creating info");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create info",
    notes: "Returns the newly created info",
    validate: { payload: infoSpec },
    response: { schema: infoSpecExt, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.infoStore.deleteAllInfos();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all infoApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.getInfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No Info with this id");
        }
        await db.infoStore.deleteInfo(info._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Info with this id");
      }
    },
    tags: ["api"],
    description: "Delete a info",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};