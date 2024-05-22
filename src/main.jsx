import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../routes/Users";
import Albums from "../routes/Albums";
import Photos from "../routes/Photos";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
