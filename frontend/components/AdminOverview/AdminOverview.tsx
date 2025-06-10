import { Link } from "react-router-dom";
import { RecentUser, Stats } from "../../hooks/interfaces";
import { getAvatarSrc } from "../../src/config/AvatarConfig";
import { URLS } from "../../src/config/navigation";
import { useTranslation } from "react-i18next";

interface Props {
    stats: Stats;
    recentUsers: RecentUser[];
}

const AdminOverview = ({ stats, recentUsers }: Props) => {
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
                <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                    <div
                        key="totalCars"
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">
                            {t("AuthenticatedView.total_cars")}
                        </dt>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                            {stats.totalCars}
                        </dd>
                    </div>

                    <div
                        key="totalUsers"
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">
                            {t("AuthenticatedView.total_users")}
                        </dt>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                            {stats.totalUsers}
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

            <div className="hidden sm:block mt-4">
                <h1 className="text-base font-semibold text-gray-900">
                    {t("AuthenticatedView.recent_users")}
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 ">
                    {recentUsers.map((person) => (
                        <div
                            key={person.username}
                            className="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400"
                        >
                            <div className="shrink-0">
                                <img
                                    alt=""
                                    src={getAvatarSrc(person.username)}
                                    className="size-10 rounded-full"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <Link
                                    to={URLS.adminViewClientVehicles(
                                        person.cognitoSub
                                    )}
                                    className="focus:outline-hidden"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                    <p className="text-sm font-medium text-gray-900">
                                        {person.username}
                                    </p>
                                    <p className="truncate text-sm text-gray-500">
                                        {person.email}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminOverview;
