import React from "react";
import NavBar from "@/components/nav";
import { NavBarProps } from "@/types/types";

const Layout: React.FC<NavBarProps> = ({ darkMode, toggleDarkmode, children }) => {
    return (
        <div>
            <NavBar darkMode={darkMode} toggleDarkmode={toggleDarkmode} />
            <main>{children}</main>
        </div>
    );
};

export default Layout;