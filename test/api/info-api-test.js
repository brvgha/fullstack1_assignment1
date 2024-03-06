import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placeMarkService } from "./placemark-service.js";
import { maggie, mCollinsBridge, testPlaceMarkInfo, testPlaceMark, bridge } from "../fixtures.js";

suite("Info API tests", () => {
  let user = null;
  let testInfo = null;

  setup(async () => {
    placeMarkService.clearAuth();
    user = await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggie);
    await placeMarkService.deleteAllPlaceMarks();
    await placeMarkService.deleteAllInfo();
    await placeMarkService.deleteAllUsers();
    user = await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggie);
    mCollinsBridge.userid = user._id;
    testInfo = await placeMarkService.createPlaceMark(mCollinsBridge);  
  });

  teardown(async () => {});

	test("create info", async () => {
		const returnedInfo = await placeMarkService.createInfo(testInfo._id, bridge);
    assertSubset(bridge, returnedInfo);
  });

	test("create Multiple info", async () => {
		for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createInfo(testInfo._id, testPlaceMarkInfo[i]);
    }
    const returnedInfo = await placeMarkService.getAllInfo();
    assert.equal(returnedInfo.length, testInfo.length);
    for (let i = 0; i < returnedInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info = await placeMarkService.getInfo(returnedInfo[i]._id);
      assertSubset(info, returnedInfo[i]);
    }
  });

	test("Delete info", async () => {
		for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createInfo(testInfo._id, testPlaceMarkInfo[i]);
    }
    let returnedInfo = await playtimeService.getAllInfo();
    assert.equal(returnedInfo.length, testPlaceMarkInfo.length);
    for (let i = 0; i < returnedInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info = await playtimeService.deleteInfo(returnedInfo[i]._id);
    }
    returnedInfo = await playtimeService.getAllInfo();
    assert.equal(returnedInfo.length, 0);
  });

	test("test denormalised placemark", async () => {
		for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createInfo(testPlaceMarkInfo._id, testPlaceMarkInfo[i]);
    }
    const returnedPlaylist = await playtimeService.getPlaylist(testInfo._id);
    assert.equal(returnedPlaylist.info.length, testPlaceMarkInfo.length);
    for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
      assertSubset(testPlaceMarkInfo[i], returnedPlaylist.info[i]);
    }
  });
});