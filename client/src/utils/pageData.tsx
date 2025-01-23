import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { IRouterType } from "@/types/types";

const HomePage = lazy(() => import("../pages/home/Homepage"));
const Markets = lazy(() => import("../pages/Markets"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const More = lazy(() => import("../pages/More"));
const WatchListPage = lazy(() => import("../pages/WatchListpage"));
const Layout = lazy(() => import("../components/Layout"));
const NotFound = lazy(() => import("../pages/404/NotFoundPage"));

const routes: IRouterType[] = [
  {
    title: "Layout",
    element: <Layout />,
    children: [
      {
        title: "Home",
        path: "/",
        element: <HomePage />,
      },
      {
        title: "WatchListPage",
        path: "/watchlist",
        element: <WatchListPage />,
      },
      {
        title: "Markets",
        path: "/markets",
        element: <Markets />,
      },
      {
        title: "Portfolio",
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        title: "More",
        path: "/more",
        element: <More />,
      },
    ],
  },
  {
    title: "NotFound",
    path: "/*",
    element: <NotFound />,
  },
];

export const PAGE_DATA: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);
