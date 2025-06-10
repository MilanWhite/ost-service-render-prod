import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import { NavigationItem, SocialNavigationItem } from "../Navbar";
import Logo from "../../Logo";
import GetAFreeQuoteButton from "../../GetAFreeQuoteButton";
import LoginWrapper from "../../LoginWrapper";
import { URLS } from "../../../src/config/navigation";

import LanguageToggle from "../../LanguageToggle";
import { useTranslation } from "react-i18next";

interface Props {
    navigation: NavigationItem[];
    social_navigation: SocialNavigationItem[];
}

export default function MobileNavbar({ navigation, social_navigation }: Props) {
    const { t } = useTranslation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <Logo height={40} to={URLS.root} />

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
            </nav>

            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Logo height={40} to={URLS.root} />
                        <LanguageToggle />

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {t(item.name as string)}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6">
                                <div className="flex flex-row items-center">
                                    {social_navigation.map((item) => {
                                        // choose size per icon
                                        const sizeClass =
                                            item.name === "LinkedIn"
                                                ? "h-6 w-6 mt-0.5"
                                                : "h-7 w-7";

                                        return (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="text-primary hover:text-primary-hover mr-3"
                                            >
                                                <span className="sr-only">
                                                    {item.name}
                                                </span>
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={sizeClass}
                                                />
                                            </a>
                                        );
                                    })}
                                </div>

                                <div className="py-6 space-y-2">
                                    <div className="pb-5 flex justify-between">
                                        <GetAFreeQuoteButton />
                                    </div>
                                    {/* LOG IN SECTION */}
                                    <LoginWrapper>
                                        <div className="-mx-3 text-left block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                            {t("HomePage.login")}
                                        </div>
                                    </LoginWrapper>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
