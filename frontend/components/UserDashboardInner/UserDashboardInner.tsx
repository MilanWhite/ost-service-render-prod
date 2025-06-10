import UserOverview from "../UserOverview";

import { useUserDashboard } from "../../hooks/useUserDashboard";
import GenericVehicleList from "../GenericVehicleList";

import UserDashboardSkeleton from "../Skeletons/UserDashboardSkeleton";

const UserDashboardInner = () => {
    const { userDashboardData } = useUserDashboard();

    return (
        <>
            {userDashboardData ? (
                <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 grid-rows-[auto,1fr]">
                    <div className="md:col-span-2 flex gap-6">
                        <div className="">
                            <UserOverview stats={userDashboardData.stats} />
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <GenericVehicleList
                            title="AuthenticatedView.recently_created"
                            vehicles={userDashboardData.recentlyCreated}
                            type="User"
                        />
                    </div>
                    <div className="flex flex-col">
                        <GenericVehicleList
                            title="AuthenticatedView.not_delivered_yet"
                            vehicles={userDashboardData.notDelivered}
                            type="User"
                        />
                    </div>
                </div>
            ) : (
                <UserDashboardSkeleton />
            )}
        </>
    );
};

export default UserDashboardInner;
