import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
// 懒加载公共方法
const withLazy = (Component) => (
  <React.Suspense fallback={<div>loading...</div>}>{Component}</React.Suspense>
);

import Home from "@/views/Home";
import Login from "@/views/Login";
const About = lazy(() => import("@/views/About"));
const ChartsBoard = lazy(() => import("@/views/ChartsBoard"));
const Page1 = lazy(() => import("@/views/Page1"));
const Page2 = lazy(() => import("@/views/Page2"));
const Page301 = lazy(() => import("@/views/Page301"));
const Page302 = lazy(() => import("@/views/Page302"));

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/page1",
        element: withLazy(<Page1 />),
        meta: { test: 234 },
      },
      {
        path: "/chartsBoard",
        element: withLazy(<ChartsBoard />),
      },
      {
        path: "/page2",
        element: withLazy(<Page2 />),
      },
      {
        path: "/page3/page301",
        element: withLazy(<Page301 />),
      },
      {
        path: "/page3/page302",
        element: withLazy(<Page302 />),
      },
      {
        path: "/about",
        element: withLazy(<About />),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/page1" />,
  },
  {
    path: "*",
    element: <Navigate to="/page1" />,
  },
];

export default routes;
