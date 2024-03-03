import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const placemarks = await db.placeMarkStore.getAllPlaceMarks();
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
          name: request.payload.name,
          cetegory: request.payload.category,
          description: request.payload.desc,
          analytics: request.payload.analytics,
      };
      await db.placeMarkStore.addPlaceMark(newPlaceMark);
      return h.redirect("/dashboard");
    },
  },
};