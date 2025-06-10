import { useTranslation } from "react-i18next";
import AboutUsSectionImage1 from "../../src/assets/images/AboutUsSectionImage1.webp";
import AboutUsSectionImage2 from "../../src/assets/images/AboutUsSectionImage2.webp";
import AboutUsSectionImage3 from "../../src/assets/images/AboutUsSectionImage3.webp";
import AboutUsSectionImage4 from "../../src/assets/images/AboutUsSectionImage4.webp";

const AboutUsSection = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden bg-white py-12 sm:py-24">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="max-w-4xl">
                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        {t("AboutPage.about_heading")}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-balance text-gray-700">
                        {t("AboutPage.about_text")}
                    </p>
                </div>
                <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
                    <div className="lg:pr-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
                            {t("AboutPage.mission_heading")}
                        </h2>
                        <p className="mt-6 text-base/7 text-gray-600">
                            {t("AboutPage.mission_text")}
                        </p>
                        <p className="mt-8 text-base/7 text-gray-600">
                            {t("AboutPage.innovation_text")}
                        </p>
                    </div>
                    <div className="pt-16 lg:pt-0 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                        <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                                <img
                                    alt=""
                                    src={AboutUsSectionImage4}
                                    className="block size-full object-cover"
                                />
                            </div>
                            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                                <img
                                    alt=""
                                    src={AboutUsSectionImage3}
                                    className="block size-full object-cover"
                                />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                                <img
                                    alt=""
                                    src={AboutUsSectionImage1}
                                    className="block size-full object-cover"
                                />
                            </div>
                            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                                <img
                                    alt=""
                                    src={AboutUsSectionImage2}
                                    className="block size-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="max-lg:mt-16 lg:col-span-1">
                        <p className="text-base/7 font-semibold text-gray-500">
                            The numbers
                        </p>
                        <hr className="mt-6 border-t border-gray-200" />
                        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                                <dt className="text-sm/6 text-gray-600">
                                    Raised
                                </dt>
                                <dd className="order-first text-6xl font-semibold tracking-tight">
                                    $<span>150</span>M
                                </dd>
                            </div>
                            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                                <dt className="text-sm/6 text-gray-600">
                                    Companies
                                </dt>
                                <dd className="order-first text-6xl font-semibold tracking-tight">
                                    <span>30</span>K
                                </dd>
                            </div>
                            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                                <dt className="text-sm/6 text-gray-600">
                                    Deals Closed
                                </dt>
                                <dd className="order-first text-6xl font-semibold tracking-tight">
                                    <span>1.5</span>M
                                </dd>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <dt className="text-sm/6 text-gray-600">
                                    Leads Generated
                                </dt>
                                <dd className="order-first text-6xl font-semibold tracking-tight">
                                    <span>200</span>M
                                </dd>
                            </div>
                        </dl>
                    </div> */}
                </section>
            </div>
        </div>
    );
};

export default AboutUsSection;
