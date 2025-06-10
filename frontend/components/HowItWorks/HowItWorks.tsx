import { useTranslation } from "react-i18next";
const steps = [
    { id: 1, text: "HomePage.step1_description" },
    { id: 2, text: "HomePage.step2_description" },
    { id: 3, text: "HomePage.step3_description" },
    { id: 4, text: "HomePage.step4_description" },
];
const HowItWorks = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                            {t("HomePage.how_it_works_heading")}
                        </h2>
                        <p className="mt-4 lg:text-lg text-gray-600">
                            {t("HomePage.how_it_works_subheading")}
                        </p>
                    </div>
                    <dl className="mt-4 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className="flex flex-col bg-gray-400/10 p-8"
                            >
                                <dt className="text-sm/6 font-semibold text-gray-600">
                                    {t("HomePage.step_title")} {step.id}
                                </dt>
                                <dd className=" text-2xl font-semibold tracking-tight text-gray-900">
                                    {t(step.text as string)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
