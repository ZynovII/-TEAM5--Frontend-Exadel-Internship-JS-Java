import React from "react";
import { initializeIcons, Nav } from "@fluentui/react";

const Links = [
    {
        links: [],
    },
];

export const DashboardNav = () => {
    initializeIcons();
    return <Nav />;
};
