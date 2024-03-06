import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { placeMarkSpec, placeMarkSpecArray, placeMarkSpecExt, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const placeMarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
          const placemarks = await db.placeMarkStore.getAllPlaceMarks();
          return placemarks;
      } catch (err) {
          return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: placeMarkSpecArray, failAction: validationError },
    description: "Get all placemarks",
    notes: "Returns all placemarks",
  },

  findOne: {
    auth: false,
      async handler(request) {
        try {
          const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
          if (!placemark) {
            return Boom.notFound("No PlaceMark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No PlaceMark with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placmark",
    notes: "Returns a Placmark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: placeMarkSpecExt, failAction: validationError },
  },

  create: {
    auth: false,
      handler: async function (request, h) {
        try {
          const placemark = request.payload;
          const newPlaceMark = await db.placeMarkStore.addPlaceMark(placemark);
          if (newPlaceMark) {
            return h.response(newPlaceMark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Placemark",
    notes: "Returns the newly created Placemark",
    validate: { payload: placeMarkSpec, failAction: validationError },
    response: { schema: placeMarkSpecExt, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No PlaceMark with this id");
        }
        await db.placeMarkStore.deletePlaceMarkById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No PlaceMark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
      handler: async function (request, h) {
        try {
          await db.placeMarkStore.deleteAllPlaceMarks();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
    },
    tags: ["api"],
    description: "Delete all PlaceMarksAPI",
  },
};