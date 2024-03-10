import dotenv from "dotenv";
import { UserSpec, UserCredentialsSpec, UserSpecExt, UserUpdateSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const result = dotenv.config();

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to PlaceMark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for PlaceMark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("./error", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      if (user.email === process.env.website_login) {
        user.type = "admin"
      } else {
        user.type = "user";
      }
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to PlaceMark" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("./error", {
            title: "Login error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      };
      if (user.type === "admin") {
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/admin");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    }
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  update: {
    validate: {
      payload: UserUpdateSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
          return h.view("./partials/error", { title: "Edit info error", errors: error.details })
              .takeover()
              .code(400);
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const newUserInfo = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        password: request.payload.password,
      };
      await db.userStore.updateUser(user, newUserInfo);
      return h.redirect("/user");
    },
  },

  account: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "Edit your PlaceMark Account Details",
        user: user,
      };
      return h.view("user-view", viewData);
    },
  },
  
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
