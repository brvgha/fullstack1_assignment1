import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlaceMark = {
          userid: loggedInUser._id,
          name: request.payload.name,
      };
      await db.placeMarkStore.addPlaceMark(newPlaceMark);
      return h.redirect("/dashboard");
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.placeMarkStore.deletePlaceMarkById(placemark.id);
      return h.redirect("/dashboard");
    },
  },
};