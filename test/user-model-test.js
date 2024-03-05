import { assert } from "chai";
import { db } from "../src/models/db.js";
import { maggie, testUsers } from "./fixtures.js";

suite("User API tests", () => {

  setup(async () => {
    db.init("json");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(maggie);
    assert.deepEqual(maggie, newUser)
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
  })
});