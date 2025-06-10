import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { DashboardUserNavigation } from "../GenericDashboardWrapper";

import NavbarIdentifier from "./NavbarIdentifier";

import { Link, useNavigate } from "react-router-dom";

import { signOut } from "aws-amplify/auth";
import { URLS } from "../../../src/config/navigation";
import LanguageToggle from "../../LanguageToggle";
import { useTranslation } from "react-i18next";

interface Props {
    dashboardUserNavigation: DashboardUserNavigation[];
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbar = ({
    dashboardUserNavigation,
    setSidebarOpen,
}: Props) => {

    const {t} = useTranslation();
    
    const navigate = useNavigate();

    const runSignOut = async () => {
        await signOut();
        navigate(URLS.root, { replace: true });
    };

    return (
        <>
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div
                    aria-hidden="true"
                    className="h-6 w-px bg-gray-200 lg:hidden"
                />

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    {/* <form
                        action="#"
                        method="GET"
                        className="grid flex-1 grid-cols-1"
                    >
                        <input
                            name="search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                        />
                    </form> */}

                    <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
                        {/* <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button> */}

                        {/* Separator */}
                        <LanguageToggle />
                        <div
                            aria-hidden="true"
                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                        />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <NavbarIdentifier />

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                {dashboardUserNavigation.map((item) => (
                                    <MenuItem key={item.name}>
                                        <Link
                                            to={item.href}
                                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                        >
                                            {item.name}
                                        </Link>
                                    </MenuItem>
                                ))}

                                {/* Sign out  */}
                                <MenuItem>
                                    <button
                                        onClick={() => {
                                            runSignOut();
                                        }}
                                        className="block px-3 text-left w-[100%] py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                    >
                                        {t("AuthenticatedView.sign_out")}
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardNavbar;
