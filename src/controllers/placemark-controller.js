import axios from "axios";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import { infoSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { addWeatherMeticsToPlaceMark, getPOIInfo } from "../utilities.js";



const result = dotenv.config();

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      let updated;
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const details = await getPOIInfo(placemark.name, placemark.city, placemark.country);
      console.log(details);
      if (details !== undefined) {
        placemark.lat = details.lat;
        placemark.lng = details.lon;
        updated = await addWeatherMeticsToPlaceMark(placemark);
        const viewData = {
          title: "PlaceMark",
          placemark: updated,
        };
        return h.view("placemark-view", viewData);
      }
      placemark.error = true;
      const viewData = {
      title: "PlaceMark",
      placemark: placemark
      };
      return h.view("placemark-view", viewData);
      }
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
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        analytics: request.payload.analytics,
      };
      await db.infoStore.addInfo(placemark._id, newInfo);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deleteInfo: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.infoStore.deleteInfo(request.params.infoid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placeMarkStore.updatePlaceMark(placemark._id,placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
