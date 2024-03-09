import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const placemarks = await db.placeMarkStore.getAllPlaceMarks();
      const info = await db.infoStore.getAllInfo();
      const viewData = {
        title: "PlaceMark Admin",
        user: loggedInUser,
        users: users,
        placemarks: placemarks,
        info: info
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin");
    }
  },

  deleteInfo: {
    handler: async function (request, h) {
      const info = await db.infoStore.getInfoById(request.params.id);
      await db.infoStore.deleteInfo(info._id);
      return h.redirect("/admin");
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const placemark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.placeMarkStore.deletePlaceMarkById(placemark._id);
      return h.redirect("/admin");
    },
  },
};
