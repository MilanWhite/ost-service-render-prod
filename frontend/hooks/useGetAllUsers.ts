import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-client";
import { User } from "./interfaces"
import { CanceledError } from "axios";

export function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [getAllUsersLoading, setAllUsersLoading] = useState<boolean>(false);
    const [getAllUsersError, setGetAllUsersError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
    setAllUsersLoading(true);
    setGetAllUsersError(null);
    try {
        const response = await apiClient.get("/api/admin/users/get-all-users");

        setAllUsers(response.data.message.users);
    } catch (err: any) {
        if (err instanceof CanceledError) return;

        setGetAllUsersError("AuthenticatedView.Errors.failed_to_fetch_users");
    } finally {
        setAllUsersLoading(false);
    }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        allUsers,
        getAllUsersLoading,
        getAllUsersError,
        getAllUsersRefetch: fetchUsers,
    } as const;
}
