import { Link } from "react-router-dom";

import { NavigationItem } from "../Navbar";
import { useTranslation } from "react-i18next";

interface Props {
    navigation: NavigationItem[];
}

export default function BottomNavbar({ navigation }: Props) {
    const { t } = useTranslation();

    return (
        <header className="z-1">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8"
            >
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-sm/6 font-semibold text-white"
                        >
                            {t(item.name as string)}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
