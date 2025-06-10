import AdminDashboardWrapper from "../../components/AdminDashboardWrapper";
import AdminClientList from "../../components/AdminClientList";

import { CreateUserContextProvider } from "../../contexts/CreateUserContext";

export function AdminClientManager() {
    return (
        <>
            <CreateUserContextProvider>
                <AdminDashboardWrapper>
                    <AdminClientList />
                </AdminDashboardWrapper>
            </CreateUserContextProvider>
        </>
    );
}
