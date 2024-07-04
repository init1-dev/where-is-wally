import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";

import MainPage from "../pages/MainPage";
import LevelComponent from "../pages/Level";

export const appName = '/hotel-miranda-dashboard';

const router = createBrowserRouter([
    {
        id: "root",
        path: "/where-is-wally",
        Component: Layout,
        children: [
            {
                path: "main",
                Component: MainPage
            },
            {
                path: "test",
                Component: LevelComponent
            },
            {
                path: "*",
                Component: MainPage
            }
        ]
    }
])

export default router;