import React from "react";

import Logo from "../Logo";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import MobileNavbar from "./MobileNavbar";

import { useMediaQuery } from "react-responsive";

import { URLS } from "../../src/config/navigation";

export interface NavigationItem {
    name: string;
    href: string;
}

export interface SocialNavigationItem {
    name: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const social_navigation = [
    {
        name: "Facebook",
        href: URLS.facebook,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: URLS.linkedin,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
];
const navigation = [
    { name: "HomePage.nav_home", href: "/" },
    { name: "HomePage.nav_contact_us", href: "/contact" },
    { name: "HomePage.nav_about_us", href: "/about" },
];

const Navbar = () => {




    const isLg = useMediaQuery({ minWidth: 1024 });

    return (
        <div>
            {isLg ? (
                <div className="relative w-full">
                    <div className="mx-auto px-4 max-w-screen-xl">
                        <div className="flex h-30">
                            <div className="w-1/5 flex items-center justify-center">
                                <Logo height={80} to={URLS.root} />
                            </div>
                            <div className="w-4/5 flex flex-col">
                                <div className="flex-1 flex justify-end items-center px-4">
                                    <TopNavbar social_navigation={social_navigation} />
                                </div>

                                <div className="flex-1 flex justify-end items-center px-4 relative">
                                    <BottomNavbar navigation={navigation} />

                                    <div
                                        className="bg-primary absolute top-0 left-[10%] h-full w-screen transform skew-x-[-45deg] origin-top-left z-0"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary absolute bottom-[0px] left-0 w-screen h-[6px]" />
                </div>
            ) : (
                <MobileNavbar navigation={navigation} social_navigation={social_navigation} />
            )}
        </div>
    );
};

export default Navbar;
