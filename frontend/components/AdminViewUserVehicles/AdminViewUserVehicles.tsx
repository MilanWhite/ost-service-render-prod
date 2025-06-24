import { useGetVehicles } from "../../hooks/useGetVehicles";
import { useGetUser } from "../../hooks/useGetUser";
import { Navigate, useParams } from "react-router-dom";
import ErrorBanner from "../../components/ErrorBanner";
import UserBanner from "../../components/UserBanner";
import AdminVehicleItemCard from "../../components/AdminVehicleItemCard";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/Dropdown";

import { useCreateVehicle } from "../../contexts/CreateVehicleContext";

import AdminCreateVehicleDialog from "../../components/AdminCreateVehicleDialog";
import SuccessBanner from "../../components/SuccessBanner";
import { useState } from "react";
import { VehicleFilterField } from "../../src/types/types";

import { VehicleFilterChoices } from "../../src/types/types";
import { useTranslation } from "react-i18next";
import VehicleCardSkeleton from "../Skeletons/VehicleCardSkeleton";

import UserBannerSkeleton from "../Skeletons/UserBannerSkeleton";

const AdminViewUserVehicles = () => {
    const { t } = useTranslation();

    const { sub } = useParams<{ sub: string }>();
    const { user, userError } = useGetUser(sub!);

    const { showCreateVehicleSuccess, setShowCreateVehicleSuccess } =
        useCreateVehicle(); // context

    const [vehicleSearch, setVehicleSearch] = useState<string>("");
    const [vehicleFilterBy, setVehicleFilterBy] =
        useState<VehicleFilterField>("vehicle_name");

    const {
        vehicles,
        meta,
        vehiclesLoading,
        vehiclesError,
        setPage,
        vehicleRefetch,
    } = useGetVehicles(sub!, 10, { vehicleSearch, vehicleFilterBy });

    if (!sub) {
        return <Navigate to="/404" replace />;
    }

    return (
        <>
            {user && (
                <AdminCreateVehicleDialog
                    user={user}
                    vehicleRefetch={vehicleRefetch}
                />
            )}
            {showCreateVehicleSuccess && (
                <SuccessBanner
                    onClick={() => {
                        setShowCreateVehicleSuccess(false);
                    }}
                >
                    {t("AuthenticatedView.Success.vehicle_added_successfully")}
                </SuccessBanner>
            )}
            {vehiclesError && (
                <ErrorBanner>{t(vehiclesError as string)}</ErrorBanner>
            )}
            {userError && <ErrorBanner>{t(userError as string)}</ErrorBanner>}

            {user ? <UserBanner user={user} /> : <UserBannerSkeleton />}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end">
                <div className="flex flex-col sm:justify-end sm:items-end mt-2 sm:mt-0">
                    <div>
                        <p className="hidden sm:block text-2xl text-base font-semibold text-gray-900">
                            {user?.username}
                            {user?.username && "'s"}{" "}
                            {t("AuthenticatedView.vehicles")}:
                        </p>

                        {vehicleSearch && (
                            <p className="text-sm text-gray-600">
                                {" "}
                                {t("AuthenticatedView.show_results_for")}{" "}
                                {vehicleSearch},{" "}
                                {t("AuthenticatedView.filtered_by")}{" "}
                                {t(
                                    VehicleFilterChoices[
                                        `${vehicleFilterBy}`
                                    ] as string
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-auto space-x-4">
                    <SearchBar setSearch={setVehicleSearch} />
                    <Dropdown
                        title={"AuthenticatedView.filter_by"}
                        options={VehicleFilterChoices}
                        onChange={(e) =>
                            setVehicleFilterBy(
                                e.target.value as VehicleFilterField
                            )
                        }
                    />
                </div>
            </div>

            {!vehiclesLoading ? (
                vehicles.map((vehicle) => (
                    <AdminVehicleItemCard key={vehicle.id} vehicle={vehicle} />
                ))
            ) : (
                <>
                    <VehicleCardSkeleton />
                    <VehicleCardSkeleton appear_size="sm" />
                    <VehicleCardSkeleton appear_size="lg" />
                </>
            )}

            <div className="py-6">
                <Pagination meta={meta} setPage={setPage} />
            </div>
        </>
    );
};

export default AdminViewUserVehicles;
