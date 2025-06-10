import { useTranslation } from "react-i18next";
import { Stats } from "../../hooks/interfaces";

interface Props {
    stats: Stats;
}

const UserOverview = ({ stats }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {t("AuthenticatedView.overview")}
            </h1>
            {/* STATS  */}
            <div className="mt-4">
                <h1 className="text-base font-semibold text-gray-900">
                    {t("AuthenticatedView.stats")}
                </h1>
                <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    <div
                        key="totalCars"
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">
                            {t("AuthenticatedView.your_total_vehicles")}
                        </dt>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                            {stats.totalCars}
                        </dd>
                    </div>

                    <div
                        key="vehiclesDelivered"
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">
                            {t("AuthenticatedView.vehicles_delivered")}
                        </dt>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                            {stats.vehiclesDelivered}
                        </dd>
                    </div>

                    <div
                        key="vehiclesNotDelivered"
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">
                            {t("AuthenticatedView.vehicles_not_delivered")}
                        </dt>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                            {stats.vehiclesNotDelivered}
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
};

export default UserOverview;
