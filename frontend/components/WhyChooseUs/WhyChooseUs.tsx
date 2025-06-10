import {
    ArchiveBoxIcon,
    TruckIcon,
    GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
const features = [
    {
        name: "HomePage.trusted_shipping_title",
        description: "HomePage.trusted_shipping_text",
        href: "#",
        icon: TruckIcon,
    },
    {
        name: "HomePage.global_reach_title",
        description: "HomePage.global_reach_text",
        href: "#",
        icon: GlobeAmericasIcon,
    },
    {
        name: "HomePage.auction_experience_title",
        description: "HomePage.auction_experience_text",
        href: "#",
        icon: ArchiveBoxIcon,
    },
];

const WhyChooseUs = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-primary py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                        {t("HomePage.why_choose_us_heading")}
                    </h2>
                </div>

                <div className="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-none">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center text-base/7 font-semibold text-white ">
                                    <feature.icon
                                        aria-hidden="true"
                                        className="w-6 h-6 text-white mr-3"
                                    />
                                    {t(feature.name as string)}
                                </dt>
                                <dd className="mt-2 text-base/7 text-gray-200 flex flex-col flex-auto">
                                    <p className="mt-2 max-w-2xl flex-auto">
                                        {t(feature.description as string)}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
