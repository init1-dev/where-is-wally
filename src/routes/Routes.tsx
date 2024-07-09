import { Navigate, createBrowserRouter, redirect } from "react-router-dom";

import Layout from "../components/Layout";

import MainPage from "../pages/MainPage";
import LevelComponent from "../pages/Level";
import BookView from "../pages/BookView";

const router = createBrowserRouter([
    {
        id: "root",
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                element: <Navigate to="/main" replace />
            },
            {
                path: "main",
                Component: MainPage
            },
            {
                path: "test",
                Component: LevelComponent
            },
            {
                path: "book/:id",
                Component: BookView
            },
            {
                path: "level/:bookId/:scenarioId",
                Component: LevelComponent
            },
            {
                path: "*",
                async loader() {
                    return redirect("/main");
                }
            }
        ]
    }
])

export default router;