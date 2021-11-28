import React from "react";
import {Alert, Link} from "@mui/material";

export const UnavailableToConnectComponent = () => {
    const hardReload = () => window.location.reload();

    return (
        <Alert severity="error">
            Unavailable to connect. Check Metamask and <Link href="#" onClick={hardReload}>Reload</Link> the page.
        </Alert>
    );
};
