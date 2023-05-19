import React, { useContext } from "react";

import { AppRoutes } from "./app.routes";
import { SyncRoutes } from "./sync.routes";

import { EstabsContext } from "../contexts/EstabsContext";

function Routes() {
    const { isSynced } = useContext(EstabsContext)

    return (
        isSynced ? <AppRoutes /> : <SyncRoutes />
    )

}

export default Routes;