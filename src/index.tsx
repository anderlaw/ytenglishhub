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
  useRoutes,
} from "react-router-dom";
import { Box } from "@mui/material";
import HomeComponent from "./home";
import VideoPlayComponent from "./video-play";
import axios from "axios";
import { CMSComponent } from "cms";
import { DemoComponent } from "demo";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<HomeComponent />} />
    <Route
      path="video"
      element={<VideoPlayComponent />}
      // loader={subtitleLoader}
    />
    <Route path="cms" element={<CMSComponent />} />
    <Route path="demo" element={<DemoComponent />} />
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
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
