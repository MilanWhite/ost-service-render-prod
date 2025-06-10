import AdminDashboardWrapper from "../../components/AdminDashboardWrapper";

import { CreateVehicleContextProvider } from "../../contexts/CreateVehicleContext";

import AdminViewUserVehicles from "../../components/AdminViewUserVehicles";
import BackButton from "../../components/BackButton";
import { URLS } from "../../src/config/navigation";

export function AdminViewClientVehicles() {
    return (
        <>
            <CreateVehicleContextProvider>
                <AdminDashboardWrapper>
                    <BackButton href={URLS.adminClientManager}/>
                    <AdminViewUserVehicles />
                </AdminDashboardWrapper>
            </CreateVehicleContextProvider>
        </>
    );
}
