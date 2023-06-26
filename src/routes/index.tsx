import React, { useContext } from "react";

import { AppRoutes } from "./app.routes";
import { SyncRoutes } from "./sync.routes";
import { AuthRoutes } from "./auth.routes";

import { EstabsContext } from "../contexts/EstabsContext";

function Routes() {
    const { isSynced, isAuth } = useContext(EstabsContext)

    return (
        isSynced && isAuth ? <AppRoutes /> :
            isSynced && !isAuth ? <AuthRoutes /> :
                <SyncRoutes />
    )

}

export default Routes;