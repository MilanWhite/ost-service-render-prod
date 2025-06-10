import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { TruckIcon, HomeIcon } from "@heroicons/react/24/outline";

import GenericDashboardWrapper from "../GenericDashboardWrapper";
import { URLS } from "../../src/config/navigation";
import { DashboardNavigation } from "../GenericDashboardWrapper/GenericDashboardWrapper";

const baseNavigation: Omit<DashboardNavigation, "current">[] = [
    { name: "AuthenticatedView.dashboard", href: URLS.home, icon: HomeIcon },
    {
        name: "AuthenticatedView.my_vehicles",
        href: "/vehicles",
        icon: TruckIcon,
    },
];

interface Props {
    children: ReactNode;
}

const RegularUserDashboardWrapper = ({ children }: Props) => {
    const { pathname } = useLocation();

    // derive current flag
    const dashboardNavigation: DashboardNavigation[] = baseNavigation.map(
        (item) => ({
            ...item,
            current: pathname === item.href,
        })
    );

    return (
        <GenericDashboardWrapper
            homeURL={URLS.home}
            dashboardNavigation={dashboardNavigation}
            dashboardUserNavigation={[]}
        >
            {children}
        </GenericDashboardWrapper>
    );
};

export default RegularUserDashboardWrapper;
