import { Navigate, createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";

import { MainPage, LevelComponent, BookView, CreateLevelComponent } from "../pages/pagesModule";
import MapLevel from "../pages/MapLevel";

const ROUTES = {
    ROOT: "/",
    MAIN: "main",
    BOOK: {
        ROOT: 'book',
        LIST: ":bookId",
        LEVEL: ":bookId/:levelId",
        CREATE: ":bookId/create",
        MAP: ":bookId/map"
    },
    NOT_FOUND: "*"
};

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Navigate to={ROUTES.MAIN} replace />
            },
            {
                path: ROUTES.MAIN,
                element: <MainPage />
            },
            {
                path: ROUTES.BOOK.ROOT,
                children: [
                    {
                        path: ROUTES.BOOK.LIST,
                        element: <BookView />,
                    },
                    {
                        path: ROUTES.BOOK.LEVEL,
                        element: <LevelComponent />
                    },
                    {
                        path: ROUTES.BOOK.CREATE,
                        element: <CreateLevelComponent />
                    },
                    {
                        path: ROUTES.BOOK.MAP,
                        element: <MapLevel />
                    },
                ]
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <Navigate to={ROUTES.MAIN} replace />
            }
        ]
    }
])

export default router;