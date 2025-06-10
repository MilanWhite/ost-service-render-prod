import GetAFreeQuoteButton from "../../GetAFreeQuoteButton";
import LoginWrapper from "../../LoginWrapper";
import { SocialNavigationItem } from "../Navbar";
import { useTranslation } from "react-i18next";

import LanguageToggle from "../../LanguageToggle";

interface Props {
    social_navigation: SocialNavigationItem[];
}

export default function TopNavbar({ social_navigation }: Props) {
    const { t } = useTranslation();

    return (
        <header className="bg-white">
            <nav
                aria-label="language"
                className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8"
            >
                <LanguageToggle />

                {social_navigation.map((item) => {
                    // choose size per icon
                    const sizeClass =
                        item.name === "LinkedIn" ? "h-6 w-6 mt-0.5" : "h-7 w-7";

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-primary hover:text-primary-hover ml-3"
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

                {/* SPACER */}
                <div className="w-5" />

                <GetAFreeQuoteButton />

                {/* LOG IN SECTION */}

                <div className="hidden lg:flex lg:gap-x-12">
                    <LoginWrapper>
                        <div className="text-sm/6 font-semibold text-gray-900 cursor-pointer ml-5">
                            {t("HomePage.login")}{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </div>
                    </LoginWrapper>
                </div>
            </nav>
        </header>
    );
}
