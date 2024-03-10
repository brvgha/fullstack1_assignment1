import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(userid, updatedUser) {
    const user = await User.findOne({ _id: userid });
    const defaultUser = await User.findOne({ _id: userid });
    if (updatedUser.firstName) {
      console.log(1)
      user.firstName = updatedUser.firstName;
    } else {
      user.firstName = defaultUser.firstName;
    }
    if (updatedUser.lastName) {
      user.lastName = updatedUser.lastName;
    } else {
      user.lastName = defaultUser.lastName;
    }
    if (updatedUser.password) {
      user.password = updatedUser.password;
    } else {
      user.password = defaultUser.password;
    }
    await user.save();
    return user;
  }
};