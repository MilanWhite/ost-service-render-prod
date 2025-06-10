import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-client";

import { User } from "./interfaces"
import { CanceledError } from "axios";

export function useGetUser(sub?: string) {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userError, setUserError] = useState<string | null>(null);
    const fetchUser = useCallback(async () => {

        if (!sub) return;
        setUserLoading(true);
        setUserError(null);

        try {
            const response = await apiClient.get(`/api/main/${sub}/get-user`);
            setUser(response.data.message.user);
        } catch (err: any) {
            if (err instanceof CanceledError) return;

            setUserError("AuthenticatedView.Errors.failed_to_fetch_user");
        } finally {
        setUserLoading(false);
    }
    }, [sub]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user,
        userLoading,
        userError,
        userRefetch: fetchUser,
    } as const;
}
