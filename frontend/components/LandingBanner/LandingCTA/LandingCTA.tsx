import GetAFreeQuoteButton from "../../GetAFreeQuoteButton";
import { Link } from "react-router-dom";
import { URLS } from "../../../src/config/navigation";
import { useTranslation } from "react-i18next";

const LandingCTA = () => {
    const { t } = useTranslation();

    return (
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 ">
                <h2 className="max-w-2xl text-4xl font-semibold text-balance text-white sm:text-5xl">
                    {t("HomePage.landing_cta_title")}
                </h2>
                <p className="mt-4 max-w-2xl lg:text-lg text-white/90">
                    {t("HomePage.landing_cta_subtitle")}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                    <GetAFreeQuoteButton />
                    <Link
                        to={URLS.about}
                        className="text-sm/6 font-semibold text-white"
                    >
                        {t("HomePage.nav_about_us")}{" "}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
    );
};

export default LandingCTA;
