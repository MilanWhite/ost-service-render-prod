import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { UserDashboardData } from "./interfaces";
import { CanceledError } from "axios";

export function useUserDashboard() {

    const [userDashboardData, setUserDashboardData] = useState<UserDashboardData | null>(null);
    const [isUserDashboardLoading, setIsUserDashboardLoading] = useState<boolean>(true);
    const [userDashboarderror, setUserDashboardError] = useState<string | null>(null);

    const fetchUserDashboard = useCallback(async () => {
        setIsUserDashboardLoading(true);
        setUserDashboardError(null);

        try {
            const response = await apiClient.get("/api/main/dashboard");
            setUserDashboardData(response.data.message);
        } catch (err: any) {
            if (err instanceof CanceledError) return;

            setUserDashboardError("AuthenticatedView.Errors.failed_to_load_dashboard");
        } finally {
            setIsUserDashboardLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserDashboard();
    }, [fetchUserDashboard]);

    return {
        userDashboardData,
        isUserDashboardLoading,
        userDashboarderror,
        userDashboardRefetch: fetchUserDashboard,
    };
}