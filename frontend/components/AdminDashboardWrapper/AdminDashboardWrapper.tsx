import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { UserGroupIcon, HomeIcon } from "@heroicons/react/24/outline";

import GenericDashboardWrapper from "../GenericDashboardWrapper";
import { URLS } from "../../src/config/navigation";

import { DashboardNavigation } from "../GenericDashboardWrapper/GenericDashboardWrapper";

const baseNavigation: Omit<DashboardNavigation, "current">[] = [
    {
        name: "AuthenticatedView.dashboard",
        href: URLS.adminHome,
        icon: HomeIcon,
    },
    {
        name: "AuthenticatedView.client_manager",
        href: URLS.adminClientManager,
        icon: UserGroupIcon,
    },
];

interface Props {
    children: ReactNode;
}

const AdminDashboardWrapper = ({ children }: Props) => {
    const { pathname } = useLocation();

    // set current selected nav
    const dashboardNavigation: DashboardNavigation[] = baseNavigation.map(
        (item) => ({
            ...item,
            current: pathname === item.href,
        })
    );

    return (
        <GenericDashboardWrapper
            homeURL={URLS.adminHome}
            dashboardNavigation={dashboardNavigation}
            dashboardUserNavigation={[]}
        >
            {children}
        </GenericDashboardWrapper>
    );
};

export default AdminDashboardWrapper;
