import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const infoJsonStore = {
  async getAllInfos() {
    await db.read();
    return db.data.infos;
  },

  async addInfo(placemarkId, info) {
    await db.read();
    info._id = v4();
    info.placemarkid = placemarkId;
    db.data.infos.push(info);
    await db.write();
    return info;
  },

  async getInfoByPlaceMarkId(id) {
    await db.read();
    return db.data.infos.filter((info) => info.placemarkid === id);
  },

  async getInfoById(id) {
    await db.read();
    return db.data.infos.find((info) => info._id === id);
  },

  async deleteInfo(id) {
    await db.read();
    const index = db.data.infos.findIndex((info) => info._id === id);
    db.data.infos.splice(index, 1);
    await db.write();
  },

  async deleteAllInfo() {
    db.data.infos = [];
    await db.write();
  },

  async updateInfo(info, updatedInfo) {
    info.category = updatedInfo.category;
    info.description = updatedInfo.description;
    info.analytics = updatedInfo.analytics;
    await db.write();
  },
};