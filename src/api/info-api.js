import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { infoSpec, placeMarkSpec } from "../models/joi-schemas.js";


export const infoApi = {
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

  deleteAll: {
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
};