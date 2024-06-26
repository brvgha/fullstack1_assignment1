import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers, maggieCredentials, barney } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placeMarkService.clearAuth();
    await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggieCredentials);
    await placeMarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await placeMarkService.createUser(testUsers[i]);
    }
    await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggieCredentials);
  });

  teardown(async () => {
    await placeMarkService.deleteAllUsers();
  });

  test("create a user", async () => {
    const newUser = await placeMarkService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placeMarkService.deleteAllUsers();
    await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggieCredentials);
    returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await placeMarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      await placeMarkService.getUser("1234");
      assert.fail("No response expected")
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get user - deleted user", async () => {
    await placeMarkService.deleteAllUsers();
    await placeMarkService.createUser(maggie);
    await placeMarkService.authenticate(maggieCredentials);
    try {
      const returnedUser = await placeMarkService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  
});