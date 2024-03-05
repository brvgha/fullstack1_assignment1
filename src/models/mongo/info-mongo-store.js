import { Info } from "./info.js";

export const infoMongoStore = {
  async getInfosByPlaceMarkId(id) {
    const infos = await Info.find({ placemarkid: id }).lean();
    return infos;
  },
};