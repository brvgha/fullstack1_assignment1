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
}