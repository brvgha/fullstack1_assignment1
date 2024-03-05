import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { infoJsonStore } from "./info-json-store.js";

export const placeMarkJsonStore = {
    async getAllPlaceMarks() {
        await db.read();
        return db.data.placemarks;
    },

    async addPlaceMark(placemark) {
        await db.read();
        placemark._id = v4();
        db.data.placemarks.push(placemark);
        await db.write();
        return placemark;
    },

    async getPlaceMarkById(id) {
        await db.read();
        const list = db.data.placemarks.find((placemark) => placemark._id === id);
        if (list) {
            list.infos = await infoJsonStore.getInfosByPlaceMarkId(list._id);
            return list;
        }
        return null;
    },

    async getUserPlaceMarks(userid) {
        await db.read();
        return db.data.placemarks.filter((placemark) => placemark.userid === userid);
    },

    async deletePlaceMarkById(id) {
        await db.read();
        const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
        db.data.placemarks.splice(index, 1);
        await db.write();
    },

    async deleteAllPlaceMarks() {
        db.data.placemarks = [];
        await db.write();
    },
}