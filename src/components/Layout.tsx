import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { toTop } from "../utils/functions";

function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        toTop();
    }, [pathname]);
    
    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;