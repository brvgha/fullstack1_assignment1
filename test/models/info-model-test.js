import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { bridge, testPlaceMarkInfo } from "../fixtures.js";


suite("Information Model tests", () => {
    setup(async () => {
        db.init("mongo");
        await db.infoStore.deleteAllInfo();
        for (let i = 0; i < testPlaceMarkInfo.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlaceMarkInfo[i] = await db.infoStore.addInfo(testPlaceMarkInfo[i]);
        }
    });

    test("create single info", async () => {
        const numOfEntriesBefore = (await db.infoStore.getAllInfo()).length;
        await db.infoStore.addInfo(bridge);
        const numOfEntriesAfter = (await db.infoStore.getAllInfo()).length;
        assert.equal(numOfEntriesBefore + 1, numOfEntriesAfter);
    });

    test("create multiple info", async () => {
        
    });

    test("delete app tracks", async () => {
        
    });

    test("get a track - success", async () => {
        
    });

    test("delete single track - success", async () => {
        
    });

    test("get a track - fail", async () => {
        
    });

    test("delete one track fail", async () => {
        
    });

}
)