import { Info } from "./info.js";
import { PlaceMark } from "./placemark.js";

export const infoMongoStore = {
  async getInfoByPlaceMarkId(id) {
    const info = await Info.find({ placemarkid: id }).lean();
    return info;
  },
  
  async getAllInfo() {
    const info = await Info.find().lean();
    return info;
  },

  async addInfo(placemarkId, info) {
    info.placemarkid = placemarkId;
    const newInfo = new Info(info);
    const infoObj = await newInfo.save();
    return this.getInfoById(infoObj._id);
  },

  async getInfoById(id) {
    if (id) {
      const info = await Info.findOne({ _id: id }).lean();
      return info;
    }
    return null;
  },

  async deleteInfo(id) {
    try {
      await Info.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllInfo() {
    await Info.deleteMany({});
  },

  async updateInfo(info, updatedInfo) {
    info.description = updatedInfo.description;
    info.category = updatedInfo.category;
    info.analytics = updatedInfo.analytics;
    await info.save();
  },
};