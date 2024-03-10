import { infoSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const infoController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const info = await db.infoStore.getInfoById(request.params.infoid);   
      const viewData = {
        title: "Show Information",
        placemark: placemark,
        info: info,
      };
      return h.view("info-view", viewData);
    },
  },

  update: {
    validate: {
      payload: infoSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
          return h.view(".error", { title: "Edit info error", errors: error.details })
              .takeover()
              .code(400);
      },
    },
    handler: async function (request, h) {
      const info = await db.infoStore.getInfoById(request.params.infoid);
      const newInfo = {
        category: request.payload.category,
        description: request.payload.description,
        analytics: Number(request.payload.analytics),
      };
      await db.infoStore.updateInfo(info, newInfo);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },
};