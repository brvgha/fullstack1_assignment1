import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";


suite("User API tests", () => {
  setup(async () => {
    await placeMarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await placeMarkService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await placeMarkService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await placeMarkService.deleteAllUsers();
    returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await placeMarkService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      await placeMarkService.getUser("1234");
      assert.fail("No response expected")
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  test("get user - deleted user", async () => {
    await placeMarkService.deleteAllUsers();
    try {
      const returnedUser = await placeMarkService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  })
});