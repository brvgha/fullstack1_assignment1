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

    teardown(async () => {});

  test("create Placemark", async () => {
    const returnedPlaceMark = await placeMarkService.createPlaceMark(mCollinsBridge);
    assert.isNotNull(returnedPlaceMark);
    assertSubset(mCollinsBridge, returnedPlaceMark);
  });

  test("delete a Placemark", async () => {
    const placemark = await placeMarkService.createPlaceMark(mozart);
    const response = await placeMarkService.deletePlaceMark(placemark._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaceMark = await placeMarkService.getPlaceMark(placemark.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No PlaceMark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple Placemarks", async () => {
    for (let i = 0; i < testPlaceMark.length; i += 1) {
    testPlaceMark[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
    await placeMarkService.createPlaceMark(testPlaceMark[i]);
    }
    let returnedLists = await placeMarkService.getAllPlaceMarks();
    assert.equal(returnedLists.length, testPlaceMark.length);
    await placeMarkService.deleteAllPlaceMarks();
    returnedLists = await placeMarkService.deleteAllPlaceMarks();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant Placemark", async () => {
    try {
      const response = await placeMarkService.deletePlaceMark("bad id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No PlaceMark with this id", "Incorrect Response Message");
    }
  });
});