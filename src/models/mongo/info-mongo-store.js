import { Info } from "./info.js";
import { PlaceMark } from "./placemark.js";

export const infoMongoStore = {
  async getInfosByPlaceMarkId(id) {
    const infos = await Info.find({ placemarkid: id }).lean();
    return infos;
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

  async getInfoByPlaceMarkId(id) {
    const info = await Info.find({ placemarkid: id }).lean();
    return info;
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
    const infoDoc = await Info.findOne({ _id: info._id });
    infoDoc.title = updatedInfo.title;
    infoDoc.artist = updatedInfo.artist;
    infoDoc.duration = updatedInfo.duration;
    await infoDoc.save();
  },
};