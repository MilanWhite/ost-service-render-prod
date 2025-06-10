import AdminVehiclePage from "../../components/AdminVehiclePage";

import { Navigate, useParams } from "react-router-dom";

import { useGetVehicle } from "../../hooks/useGetSingularVehicle";

import { URLS } from "../../src/config/navigation";

import BackButton from "../../components/BackButton";
import ErrorBanner from "../../components/ErrorBanner";
import { useTranslation } from "react-i18next";
import SingularVehiclePageSkeleton from "../Skeletons/SingularVehiclePageSkeleton";

const AdminViewUserSingularVehicle = () => {
    const { t } = useTranslation();

    const { sub, vehicle_id } = useParams<{
        sub?: string;
        vehicle_id?: string;
    }>();

    if (!sub || !vehicle_id) {
        return <Navigate to="/404" replace />;
    }

    const { vehicle, vehicleError } = useGetVehicle(sub, vehicle_id);

    return (
        <>
            <BackButton href={URLS.adminViewClientVehicles(sub)} />
            {vehicleError && (
                <ErrorBanner>{t(vehicleError as string)}</ErrorBanner>
            )}
            {vehicle ? (
                <>
                    <AdminVehiclePage vehicle={vehicle!} />
                </>
            ) : (
                <SingularVehiclePageSkeleton />
            )}
        </>
    );
};

export default AdminViewUserSingularVehicle;
