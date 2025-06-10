import React from "react";

import { URLS } from "../../src/config/navigation";
import { useTranslation } from "react-i18next";

const navigation = [
    {
        name: " ",
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

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center gap-x-5 md:order-2">
                    {navigation.map((item) => {
                        // choose size per icon
                        const sizeClass =
                            item.name === "LinkedIn"
                                ? "h-6 w-6 mt-0.5"
                                : "h-7 w-7";

                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-gray-800"
                                target="_blank"
                            >
                                <span className="sr-only">{item.name}</span>
                                <item.icon
                                    aria-hidden="true"
                                    className={sizeClass}
                                />
                            </a>
                        );
                    })}
                </div>
                <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
                    {t("HomePage.footer_copyright")}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
