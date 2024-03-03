import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getAllPlaceMarks();
      const viewData = {
        title: "PlaceMark Dashboard",
        placemarks: placemarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaceMark: {
    handler: async function (request, h) {
      const newPlaceMark = {
        name: request.payload.title,
      };
      await db.placemarkStore.addPlaceMark(newPlaceMark);
      return h.redirect("/dashboard");
    },
  },
};