import { v4 } from "uuid";

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

  async getPlaceMarksById(id) {
    return placemarks.find((placemark) => placemark._id === id);
  },

  async deletePlaceMarksId(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlaceMarks() {
    placemarks = [];
  },
};