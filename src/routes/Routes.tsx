import { Navigate, createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";

import MainPage from "../pages/MainPage";
import LevelComponent from "../pages/Level";
import BookView from "../pages/BookView";

const ROUTES = {
    ROOT: "/",
    MAIN: "/main",
    BOOK: "/book/:id",
    LEVEL: "/level/:bookId/:levelId",
    NOT_FOUND: "*"
};

const router = createBrowserRouter([
    {
        id: "root",
        path: ROUTES.ROOT,
        element: <Layout />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Navigate to="/main" replace />
            },
            {
                path: ROUTES.MAIN,
                element: <MainPage />
            },
            {
                path: ROUTES.BOOK,
                element: <BookView />
            },
            {
                path: ROUTES.LEVEL,
                element: <LevelComponent />
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <Navigate to="/main" replace />
            }
        ]
    }
])

export default router;