import { PlaceMark } from "./placemark.js";
import { infoMongoStore } from "./info-mongo-store.js";
import { Info } from "./info.js";

export const placeMarkMongoStore = {
  async getAllPlaceMarks() {
    const placemarks = await PlaceMark.find().lean();
    return placemarks;
  },

  async getPlaceMarkById(id) {
    if (id) {
      const placemark = await PlaceMark.findOne({ _id: id }).lean();
      if (placemark) {
        placemark.infos = await infoMongoStore.getInfoByPlaceMarkId(placemark._id);
      }
      return placemark;
    }
    return null;
  },

  async addPlaceMark(placemark) {
    const newPlaceMark = new PlaceMark(placemark);
    const placemarkObj = await newPlaceMark.save();
    return this.getPlaceMarkById(placemarkObj._id);
  },

  async getUserPlaceMarks(id) {
    const placemark = await PlaceMark.find({ userid: id }).lean();
    return placemark;
  },

  async deletePlaceMarkById(id) {
    try {
      if (id) {
        const infos = await infoMongoStore.getInfoByPlaceMarkId(id)
        for (let i = 0; i < infos.length; i += 1){
          // eslint-disable-next-line no-await-in-loop
          await Info.deleteOne({ _id: infos[i]._id})
      } 
      }
      await PlaceMark.deleteOne({ _id: id });
      
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaceMarks() {
    await PlaceMark.deleteMany({});
  },

  async updatePlaceMark(placemarkid, updatedPlaceMark) {
    const placemark = await PlaceMark.findOne({ _id: placemarkid });
    placemark.name = updatedPlaceMark.name;
    placemark.city = updatedPlaceMark.city;
    placemark.country = updatedPlaceMark.country;
    placemark.img = updatedPlaceMark.img;
    await placemark.save();
    return placemark;
  }
};