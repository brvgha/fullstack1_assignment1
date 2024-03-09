import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { bridge, mCollinsBridge, testPlaceMarkInfo } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Information Model tests", () => {

    let testPlaceMarkList = null;

    setup(async () => {
        db.init("mongo");
        await db.infoStore.deleteAllInfo();
        await db.placeMarkStore.deleteAllPlaceMarks();
        testPlaceMarkList = await db.placeMarkStore.addPlaceMark(mCollinsBridge);
        for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await db.infoStore.addInfo(testPlaceMarkList._id,testPlaceMarkInfo[i]);
        }
    });

    teardown(async () => {
        await db.infoStore.deleteAllInfo();
    });

    test("create single info", async () => {
        await db.infoStore.addInfo(testPlaceMarkList._id,bridge);
        const info = await db.infoStore.getAllInfo();
        assertSubset(bridge, info);
    });

    test("create multiple info", async () => {
        const info = await db.infoStore.getInfoByPlaceMarkId(testPlaceMarkList._id);
        assert.equal(testPlaceMarkInfo.length, info.length);
    });

    test("delete all infos", async () => {
        await db.infoStore.deleteAllInfo();
        const check = await db.infoStore.getAllInfo();
        assert.equal(check.length, 0);
    });

    test("get info - success", async () => {
        const bridgeTest = await db.infoStore.addInfo(testPlaceMarkList._id, bridge);
        const info = await db.infoStore.getInfoById(bridgeTest._id);
        assert.deepEqual(bridgeTest, info);
    });

    test("delete single info - success", async () => {
        const bridgeTest = await db.infoStore.addInfo(testPlaceMarkList._id, bridge);
        const numOfEntriesBefore = (await db.infoStore.getAllInfo()).length;
        const info = await db.infoStore.deleteInfo(bridgeTest._id);
        const numOfEntriesAfter = (await db.infoStore.getAllInfo()).length;
        assert.equal(numOfEntriesBefore - 1, numOfEntriesAfter);

    });

    test("get a info - fail", async () => {
        assert.isNull(await db.infoStore.getInfoById(""));
        assert.isNull(await db.infoStore.getInfoById());
    });

    test("delete one info fail", async () => {
        await db.infoStore.deleteInfo("bad-id");
        const info = await db.infoStore.getAllInfo();
        assert.equal(info.length, testPlaceMarkInfo.length);
    });

}
)