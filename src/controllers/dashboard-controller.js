import { db } from "../models/db.js";
import { placeMarkSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placeMarkStore.getUserPlaceMarks(loggedInUser._id);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaceMark: {
    validate: {
      payload: placeMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("./partials/error", {
            title: "PlaceMark input error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlaceMark = {
        userid: loggedInUser._id,
        name: request.payload.name,
        city: request.payload.city,
        country: request.payload.country,
      };
      await db.placeMarkStore.addPlaceMark(newPlaceMark);
      return h.redirect("/dashboard");
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.placeMarkStore.deletePlaceMarkById(placemark._id);
      return h.redirect("/dashboard");
    },
  },
};