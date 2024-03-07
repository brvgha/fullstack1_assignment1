import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { barney, maggie, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assertSubset(maggie, newUser)
  });

  test("delete all users", async () => {
    let users = await db.userStore.getAllUsers()
    assert.equal(users.length, 3);
    await db.userStore.deleteAll();
    users = await db.userStore.getAllUsers();
    assert.equal(users.length, 0);
  });

  test("get user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    const dbUser = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, dbUser);
    const dbUserEmail = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, dbUserEmail);
  });
  
  test("delete one user by id - pass", async () => {
    const user = await db.userStore.addUser(maggie);
    const id = user._id;
    const beforeDelete = (await db.userStore.getAllUsers()).length;
    await db.userStore.deleteUserById(id);
    const afterDelete = (await db.userStore.getAllUsers()).length;
    assert.equal(afterDelete, beforeDelete - 1);
  });
  test("get a user - fail", async () => { 
    const user = await db.userStore.getUserById();
    console.log(user);
    assert.isNull(user);
  });
  test("delete one user -  fail", async () => { 
    const numOfUsersBefore = (await db.userStore.getAllUsers()).length;
    await db.userStore.deleteUserById();
    const numOfUsersAfter = (await db.userStore.getAllUsers()).length;
    assert.equal(numOfUsersAfter, numOfUsersBefore);
  });

  test("update user - success", async () => {
    const user = await db.userStore.addUser(maggie);
    const updatedUser = await db.userStore.updateUser(user._id, barney)
    assertSubset(barney, updatedUser);
  });
});