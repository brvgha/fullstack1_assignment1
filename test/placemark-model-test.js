import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlaceMark, mCollinsBridge } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Placemark Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placeMarkStore.deleteAllPlaceMarks();
    for (let i = 0; i < testPlaceMark.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
			testPlaceMark[i] = await db.placeMarkStore.addPlaceMark(testPlaceMark[i]);
    }
  });

  test("create a placemark", async () => {
    const placemark = await db.placeMarkStore.addPlaceMark(mCollinsBridge);
    assertSubset(mCollinsBridge, placemark);
    assert.isDefined(placemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlacemarks.length, 3);
    await db.placeMarkStore.deleteAllPlaceMarks();
    returnedPlacemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placeMarkStore.addPlaceMark(mCollinsBridge);
		const returnedPlacemark = await db.placeMarkStore.getPlaceMarkById(placemark._id);
    assertSubset(mCollinsBridge, returnedPlacemark);
  });

	test("delete One Placemark - success", async () => {
    const id = testPlaceMark[0]._id;
    await db.placeMarkStore.deletePlaceMarkById(id);
		const returnedPlacemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlacemarks.length, testPlaceMark.length - 1);
		const deletedPlacemark = await db.placeMarkStore.getPlaceMarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placeMarkStore.getPlaceMarkById(""));
    assert.isNull(await db.placeMarkStore.getPlaceMarkById());
  });

	test("delete One Placemark - fail", async () => {
    await db.placeMarkStore.deletePlaceMarkById("bad-id");
    const allPlacemarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(testPlaceMark.length, allPlacemarks.length);
  });
});