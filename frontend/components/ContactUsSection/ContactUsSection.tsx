import {
    BuildingOffice2Icon,
    EnvelopeIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";

import ContactUsForm from "./ContactUsForm";
import GoogleMap from "./GoogleMap";
import { useTranslation } from "react-i18next";

const ContactUsSection = () => {
    const { t } = useTranslation();

    return (
        <div className="relative isolate bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 py-12 lg:static lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                aria-hidden="true"
                                className="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
                            >
                                <defs>
                                    <pattern
                                        x="100%"
                                        y={-1}
                                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                        width={200}
                                        height={200}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M130 200V.5M.5 .5H200"
                                            fill="none"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="white"
                                    width="100%"
                                    height="100%"
                                    strokeWidth={0}
                                />
                                <svg
                                    x="100%"
                                    y={-1}
                                    className="overflow-visible fill-gray-50"
                                >
                                    <path
                                        d="M-470.5 0h201v201h-201Z"
                                        strokeWidth={0}
                                    />
                                </svg>
                                <rect
                                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                                    width="100%"
                                    height="100%"
                                    strokeWidth={0}
                                />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                            {t("ContactPage.contact_heading")}
                        </h2>
                        <p className="mt-4 max-w-2xl lg:text-lg text-gray-600">
                            {t("ContactPage.contact_description")}
                        </p>
                        <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">
                                        {t("ContactPage.address_label")}
                                    </span>
                                    <BuildingOffice2Icon
                                        aria-hidden="true"
                                        className="h-7 w-6 text-primary"
                                    />
                                </dt>
                                <dd>
                                    {t("ContactPage.address_value1")}
                                    <br />
                                    {t("ContactPage.address_value2")}
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">
                                        {t("ContactPage.telephone_label")}
                                    </span>
                                    <PhoneIcon
                                        aria-hidden="true"
                                        className="h-7 w-6 text-primary"
                                    />
                                </dt>
                                <dd>
                                    <a
                                        href="tel:+1 (647) 857-3105"
                                        className="hover:text-gray-900"
                                    >
                                        {t("ContactPage.telephone_value")}
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">
                                        {t("ContactPage.email_label")}
                                    </span>
                                    <EnvelopeIcon
                                        aria-hidden="true"
                                        className="h-7 w-6 text-primary"
                                    />
                                </dt>
                                <dd>
                                    <a
                                        href="mailto:bestiklena1@gmail.com"
                                        className="hover:text-gray-900"
                                    >
                                        {t("ContactPage.email_value")}
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <GoogleMap />
                </div>
                <ContactUsForm />
            </div>
        </div>
    );
};

export default ContactUsSection;
