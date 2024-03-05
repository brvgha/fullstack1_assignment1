import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placeMarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
        console.log(1);
    },
  },

  findOne: {
    auth: false,
      async handler(request) {
        console.log(1);
    },
  },

  create: {
    auth: false,
      handler: async function (request, h) {
        console.log(1);
    },
  },

  deleteOne: {
    auth: false,
      handler: async function (request, h) {
        console.log(1);
    },
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
    },
};