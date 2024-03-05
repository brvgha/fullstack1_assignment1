import { EventEmitter } from "events";
import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { mCollinsBridge, testPlaceMark, maggie } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placemark API tests", () => {
    let user = null;
    setup(async () => {
        await placeMarkService.deleteAllPlacemarks();
        await placeMarkService.deleteAllUsers();
        user = await placeMarkService.createUser(maggie);
        mCollinsBridge.userid = user._id;
  });

    teardown(async () => {
      
  });

    test("create Placemark", async () => {
        
  });

    test("delete a Placemark", async () => {
      
  });

    test("create multiple Placemarks", async () => {
      
  });

    test("remove non-existant Placemark", async () => {
      
  });
});