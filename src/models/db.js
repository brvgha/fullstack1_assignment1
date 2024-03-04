import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  infoMemStore: null,

  init() {
    this.userStore = userMemStore;
    this.placeMarkStore = placeMarkMemStore;
    this.infoStore = infoMemStore;
  },
};