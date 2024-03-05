import { db } from "../models/db.js";
import { infoSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const viewData = {
        title: "PlaceMark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addInfo: {
    validate: {
      payload: infoSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("./partials/error", {
            title: "Information input error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const newInfo = {
        category: request.payload.category,
        description: request.payload.description,
        analytics: request.payload.analytics,
        // image: request.payload.image,
        // location: request.payload.location,
        // weather: request.payload.weather,
      };
      await db.infoStore.addInfo(placemark._id, newInfo);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deleteInfo: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const info = await db.infoStore.getInfoById(request.params.infoid);
      await db.infoStore.deleteInfo(info);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
