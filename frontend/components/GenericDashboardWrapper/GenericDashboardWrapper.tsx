import React, { ReactNode, useState } from "react";

import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import DashboardNavbar from "./DashboardNavbar";

export interface DashboardNavigation {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref">
    >;
    current?: boolean;
}

export interface DashboardUserNavigation {
    name: string;
    href: string;
}

interface Props {
    children: ReactNode;
    homeURL: string;
    dashboardNavigation: DashboardNavigation[];
    dashboardUserNavigation: DashboardUserNavigation[];
}

const GenericDashboardWrapper = ({
    children,
    homeURL,

    dashboardNavigation,
    dashboardUserNavigation,
}: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                {/* MOBILE SIDEBAR  */}
                <MobileSidebar
                    homeURL={homeURL}
                    dashboardNavigation={dashboardNavigation}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* Static sidebar for desktop */}
                <DesktopSidebar
                    homeURL={homeURL}
                    dashboardNavigation={dashboardNavigation}
                />

                <div className="lg:pl-72">
                    <DashboardNavbar
                        dashboardUserNavigation={dashboardUserNavigation}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-12">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default GenericDashboardWrapper;
