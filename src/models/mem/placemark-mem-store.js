import { v4 } from "uuid";
import { infoMemStore } from "./info-mem-store.js";

let placemarks = [];

export const placeMarkMemStore = {
  async getAllPlaceMarks() {
    return placemarks;
  },

  async addPlaceMark(placemark) {
    placemark._id = v4();
    placemarks.push(placemark);
    return placemark;
  },

  async getPlaceMarkById(id) {
    const list = placemarks.find((placemark) => placemark._id === id);
    list.infos = await infoMemStore.getInfoByPlaceMarkId(list._id);
    return list;
  },

  async getUserPlaceMarks(userid) {
    return placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlaceMarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlaceMarks() {
    placemarks = [];
  },
};