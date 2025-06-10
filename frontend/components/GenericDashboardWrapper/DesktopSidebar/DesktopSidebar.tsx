import { DashboardNavigation } from "../GenericDashboardWrapper";
import Logo from "../../Logo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


interface Props {
    dashboardNavigation: DashboardNavigation[];
    homeURL: string;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const DesktopSidebar = ({ dashboardNavigation, homeURL }: Props) => {

    const {t} = useTranslation()

    return (
        <>
            {" "}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-25 shrink-0 items-center">
                        <Logo height={80} to={homeURL} />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {dashboardNavigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-50 text-primary"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-hover",
                                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current
                                                            ? "text-primary"
                                                            : "text-gray-400 group-hover:text-primary-hover",
                                                        "size-6 shrink-0"
                                                    )}
                                                />
                                                {t(item.name as string)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>


                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default DesktopSidebar;
