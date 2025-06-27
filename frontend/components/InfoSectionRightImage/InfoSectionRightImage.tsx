import { useTranslation } from "react-i18next";
import LandingBannerImage from "../../src/assets/images/InfoSectionRightImage.webp";

import GetAFreeQuoteButton from "../GetAFreeQuoteButton";

const InfoSectionRightImage = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden pt-6 sm:pt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
                    <div className="lg:pt-4 lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {t("HomePage.auto_auctions_title")}
                            </p>
                            <p className="mt-4 max-w-2xl lg:text-lg text-gray-600">
                                {t("HomePage.auto_auctions_text")}
                            </p>
                            <div className="mt-6">
                                <GetAFreeQuoteButton />
                            </div>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src={LandingBannerImage}
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-h-[300px] [object-position:50%_40%] object-cover max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:ml-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoSectionRightImage;
