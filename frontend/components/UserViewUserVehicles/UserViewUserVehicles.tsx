import { useGetVehicles } from "../../hooks/useGetVehicles";
import ErrorBanner from "../../components/ErrorBanner";
import UserVehicleItemCard from "../../components/UserVehicleItemCard";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/Dropdown";

import { useState } from "react";
import { VehicleFilterField } from "../../src/types/types";

import { VehicleFilterChoices } from "../../src/types/types";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useTranslation } from "react-i18next";

import VehicleCardSkeleton from "../Skeletons/VehicleCardSkeleton";

const UserViewUserVehicles = () => {
    const { t } = useTranslation();

    const [vehicleSearch, setVehicleSearch] = useState<string>("");
    const [vehicleFilterBy, setVehicleFilterBy] =
        useState<VehicleFilterField>("vehicle_name");

    const { user } = useAuthenticator((ctx) => [ctx.user]);

    const { vehicles, meta, vehiclesLoading, vehiclesError, setPage } =
        useGetVehicles(user.userId, 10, { vehicleSearch, vehicleFilterBy });

    return (
        <>
            {vehiclesError && (
                <ErrorBanner>{t(vehiclesError as string)}</ErrorBanner>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end">
                <div className="flex flex-col sm:justify-end sm:items-end mt-2 sm:mt-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {t("AuthenticatedView.your_vehicles")}
                        </h1>

                        {vehicleSearch && (
                            <p className="text-sm text-gray-600">
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
                    <UserVehicleItemCard key={vehicle.id} vehicle={vehicle} />
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

export default UserViewUserVehicles;
