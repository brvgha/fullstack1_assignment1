import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placeMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  },
  async getUser(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async createPlaceMark(placemark) {
    const res = await axios.post(`${this.placeMarkUrl}/api/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlaceMarks() {
    const response = await axios.delete(`${this.placeMarkUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlaceMark(id) {
    const response = await axios.delete(`${this.placeMarkUrl}/api/placemarks/${id}`);
    return response;
  },

  async getAllPlaceMarks() {
    const res = await axios.get(`${this.placeMarkUrl}/api/placemarks`);
    return res.data;
  },

  async getPlaceMark(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

   async getAllInfo() {
    const res = await axios.get(`${this.placeMarkUrl}/api/info`);
    return res.data;
  },

  async createInfo(id, info) {
    const res = await axios.post(`${this.placeMarkUrl}/api/playlists/${id}/info`, info);
    return res.data;
  },

  async deleteAllInfo() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/info`);
    return res.data;
  },

  async getInfo(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/info/${id}`);
    return res.data;
  },

  async deleteInfo(id) {
    const res = await axios.delete(`${this.placeMarkUrl}/api/info/${id}`);
    return res.data;
  },

   async authenticate(user) {
    const response = await axios.post(`${this.placeMarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
}