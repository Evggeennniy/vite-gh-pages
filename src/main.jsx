import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Users from "./routes/Users";
import Albums from "./routes/Albums";
import Photos from "./routes/Photos";
import { ToDoListRedux } from "./components/List";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ToDoListRedux />,
    },
    {
      path: "/user/all",
      element: <Users />,
    },
    {
      path: "/user/:userId/albums",
      element: <Albums />,
    },
    {
      path: "/album/:albumId/photos",
      element: <Photos />,
    },
  ],
  {
    basename: "/vite-gh-pages",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
