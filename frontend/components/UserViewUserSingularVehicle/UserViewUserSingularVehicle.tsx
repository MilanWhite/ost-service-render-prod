import UserVehiclePage from "../../components/UserVehiclePage";

import { Navigate, useParams } from "react-router-dom";

import { useGetVehicle } from "../../hooks/useGetSingularVehicle";

import { URLS } from "../../src/config/navigation";

import BackButton from "../../components/BackButton";
import ErrorBanner from "../../components/ErrorBanner";
import { useTranslation } from "react-i18next";

import { useAuthenticator } from "@aws-amplify/ui-react";

import SingularVehiclePageSkeleton from "../Skeletons/SingularVehiclePageSkeleton";

const UserViewUserSingularVehicle = () => {
    const { t } = useTranslation();

    const { user } = useAuthenticator((ctx) => [ctx.user]);

    const { vehicle_id } = useParams<{
        vehicle_id?: string;
    }>();

    if (!user || !vehicle_id) {
        return <Navigate to="/404" replace />;
    }

    const { vehicle, vehicleError } = useGetVehicle(user.userId, vehicle_id);

    return (
        <>
            <BackButton href={URLS.vehicles} />
            {vehicleError && (
                <ErrorBanner>{t(vehicleError as string)}</ErrorBanner>
            )}
            {vehicle ? (
                <>
                    <UserVehiclePage vehicle={vehicle!} />
                </>
            ) : (
                <SingularVehiclePageSkeleton />
            )}
        </>
    );
};

export default UserViewUserSingularVehicle;
