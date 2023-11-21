import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import { Box } from "@mui/material";
import HomeComponent from "./home";
import VideoPlayComponent from "./video-play";
import axios from "axios";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<HomeComponent />} />
    <Route
      path="video"
      element={<VideoPlayComponent />}
      // loader={subtitleLoader}
    />
    {/* <Route element={<AuthLayout />}>
      <Route
        path="login"
        element={<Login />}
        loader={redirectIfUser}
      />
      <Route path="logout" action={logoutUser} />
    </Route> */}
  </Route>
);
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
