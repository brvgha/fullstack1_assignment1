// import { userMemStore } from "./mem/user-mem-store.js";
// import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
// import { infoMemStore } from "./mem/info-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placemark-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  infoStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placeMarkStore = placeMarkJsonStore;
    this.infoStore = infoJsonStore;
  },
};