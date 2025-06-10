import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-client"
import {AdminDashboardData} from "./interfaces"
import { CanceledError } from "axios";

export function useAdminDashboard() {
    const [adminDashboardData, setAdminDashboardData] = useState<AdminDashboardData | null>(null);
    const [isAdminDashboardLoading, setIsAdminDashboardLoading] = useState<boolean>(true);
    const [adminDashboardError, setAdminDashboardError] = useState<string | null>(null);

    const fetchAdminDashboard = useCallback(async () => {
        setIsAdminDashboardLoading(true);
        setAdminDashboardError(null);

        try {
            const response = await apiClient.get("/api/admin/dashboard");
            setAdminDashboardData(response.data.message);
        } catch (err: any) {
            if (err instanceof CanceledError) return;

            setAdminDashboardError("AuthenticatedView.Errors.failed_to_load_dashboard");
        } finally {
            setIsAdminDashboardLoading(false);

        }
    }, []);

    useEffect(() => {
        fetchAdminDashboard();
    }, [fetchAdminDashboard]);

    return {
        adminDashboardData,
        isAdminDashboardLoading,
        adminDashboardError,
        adminDashboardRefetch: fetchAdminDashboard,
    };
}
