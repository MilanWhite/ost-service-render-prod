import AdminOverview from "../AdminOverview";
import ActivityFeed from "../ActivityFeed";
import GenericVehicleList from "../GenericVehicleList";

import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import ErrorBanner from "../ErrorBanner";
import { useTranslation } from "react-i18next";

import AdminDashboardSkeleton from "../Skeletons/AdminDashboardSkeleton";

const AdminDashboardInner = () => {
    const { t } = useTranslation();

    const { adminDashboardData, adminDashboardError } = useAdminDashboard();

    return (
        <>
            {adminDashboardError && (
                <ErrorBanner>{t(adminDashboardError as string)}</ErrorBanner>
            )}

            {adminDashboardData ? (
                <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 grid-rows-[auto,1fr]">
                    <div className="md:col-span-2 flex gap-6">
                        <div className="basis-4/4 2xl:basis-3/4">
                            <AdminOverview
                                stats={adminDashboardData.stats}
                                recentUsers={adminDashboardData.recentUsers}
                            />
                        </div>

                        <div className="hidden 2xl:block basis-1/4 ">
                            <ActivityFeed
                                activityFeed={adminDashboardData.activityFeed}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <GenericVehicleList
                            title="AuthenticatedView.recently_created"
                            vehicles={adminDashboardData.recentVehicles}
                            type="Admin"
                        />
                    </div>
                    <div className="flex flex-col">
                        <GenericVehicleList
                            title="AuthenticatedView.not_delivered"
                            vehicles={adminDashboardData.vehiclesNotDelivered}
                            type="Admin"
                        />
                    </div>
                </div>
            ) : (
                <AdminDashboardSkeleton />
            )}
        </>
    );
};

export default AdminDashboardInner;
