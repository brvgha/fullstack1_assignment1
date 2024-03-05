// memory storage
import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
// json storage
import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placemark-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";
// mongo storage
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placeMarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { infoMongoStore } from "./mongo/info-mongo-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  infoStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placeMarkStore = placeMarkJsonStore;
        this.infoStore = infoJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placeMarkStore = placeMarkMongoStore;
        this.infoStore = infoMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placeMarkStore = placeMarkMemStore;
        this.infoStore = infoMemStore;
    }
  },
};