import { configureStore } from "@reduxjs/toolkit";
import activeJam from "./reducers/activeJam";
import auth from "./reducers/auth";
import galleriesReducer from "./reducers/galleriesReducer";
import imagesReducer from "./reducers/imagesReducer";
import usersReducer from "./reducers/usersReducer";

export const store = configureStore({
  reducer: {
    authUser: auth.authUser,
    authStatus: auth.authStatus,
    adminStatus: auth.adminStatus,
    activeJam,
    imagesByUser: imagesReducer.imagesByUser,
    imagesByGallery: imagesReducer.imagesByGallery,
    galleriesMap: galleriesReducer.galleriesMap,
    usersMap: usersReducer.userMap
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;