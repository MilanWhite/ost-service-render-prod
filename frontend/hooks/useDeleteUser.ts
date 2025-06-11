import { Dispatch, SetStateAction, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface UseDeleteUserResult {
    isDeleteUserLoading: boolean;
    deleteUserError: string | null;
    setDeleteUserError: Dispatch<SetStateAction<string | null>>;
    deleteUser: (sub: string) => Promise<boolean>;
}

export function useDeleteUser(): UseDeleteUserResult {
    const [isDeleteUserLoading, setIsDeleteUserLoading] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState<string | null>(null);

    async function deleteUser(sub: string) {
        setIsDeleteUserLoading(true);
        setDeleteUserError(null);

        try {
            await apiClient.post(`/api/admin/users/${sub}/delete-user`);
            return false; // no error
        } catch (err: any) {
            if (err instanceof CanceledError) {
                return false;
            }
            setDeleteUserError(
                "AuthenticatedView.Errors.failed_to_delete_user"
            );
            return true; // an error occurred
        } finally {
            setIsDeleteUserLoading(false);
        }
    }

    return {
        isDeleteUserLoading,
        deleteUserError,
        setDeleteUserError,
        deleteUser,
    };
}
