import { v4 } from "uuid";

let infos = [];

export const infoMemStore = {
  async getAllInfos() {
    return infos;
  },

  async addInfo(placemarkId, info) {
    info._id = v4();
    info.placemarkid = placemarkId;
    infos.push(info);
    return info;
  },

  async getInfoByPlaceMarkId(id) {
    return infos.filter((info) => track.placemarkid === id);
  },

  async getInfoById(id) {
    return infos.find((info) => info._id === id);
  },

  async getPlaceMarkInfos(placemarkId) {
    return infos.filter((info) => info.placemarkid === placemarkId);
  },

  async deleteInfo(id) {
    const index = infos.findIndex((info) => info._id === id);
    infos.splice(index, 1);
  },

  async deleteAllTracks() {
    infos = [];
  },

  async updateInfo(info, updatedInfo) {
    info.image = updatedInfo.image;
    info.location = updatedInfo.location;
    info.weather = updatedInfo.weather;
  },
};