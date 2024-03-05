import { userApi } from "./api/user-api.js";
import { placeMarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/placemarks", config: placeMarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placeMarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks", config: placeMarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placeMarkApi.findOne },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placeMarkApi.deleteOne },
];