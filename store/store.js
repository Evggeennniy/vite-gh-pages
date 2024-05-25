import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../taskSlice/taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
